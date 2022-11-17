import puppeteer, { Page } from 'puppeteer';

const _DATASOURCEPAGELOGIN = 'https://www.gsccca.org/';
const _DATASOURCEPAGESEARCH =
  'https://search.gsccca.org/PT61Premium/AddressSearch.aspx';
//?? possibly needs to be encrypted at some point
const _USERNAME = 'dmSmith';
const _PASSWORD = '799Ln38Lsjqs!yg^99wfs*9ahYo6L8';

interface DeedData {
  county: string;
  dateOfSale: Date;
  deedBook: number | string;
  deedPage: number | string;
  propertyAddress: string;
  propertyValue: number | string;
  propertyTaxDue: number | string;
  propertyLandDistrict: string;
  propertyLandLot: number | string;
  buyerName: string;
  buyerAddress: string;
  sellerName: string;
  sellerAddress: string;
}

//navigates to source of deed data
async function navigateToSource(address: string): Promise<void> {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await navigateDataSource(page, address);

  await scrapeData(page, address);

  browser.close();
}

//navigate to page with deed data
async function navigateDataSource(page: puppeteer.Page, address: string) {
  await page.goto(_DATASOURCEPAGELOGIN);

  //click login [top right]
  await page.click('#head > div > ul > li.pnlLogin');

  //input username in login popup
  await page.type('#username', _USERNAME);

  //input password in login popup
  await page.type('#password', _PASSWORD);

  //click login button in login popup
  //then wait for login to complete
  await page.click('#loginbtn');
  await page.waitForSelector('#head > div > ul > li.pnlLogout.show-element', {
    visible: true,
  });

  //goto search
  await page.goto(_DATASOURCEPAGESEARCH);

  //input address
  await page.type('#BodyContent_txtAddress', address);

  //click 'begin search'
  await Promise.all([
    page.click('#BodyContent_btnSearch'),
    page.waitForNavigation(),
  ]);

  //wait for deed data selections to load
  await page.waitForSelector('#BodyContent_lvDashboard_btnViewPT61_0');

  const deedIndex = await getLatestDeedIndex(page);
  //click 'view pt-61 information' for deed data page
  await page.click(`#BodyContent_lvDashboard_btnViewPT61_${deedIndex}`);
}

async function getLatestDeedIndex(page: puppeteer.Page) {
  //if more than one result for deed find latest
  //otherwise return only deed available
  if (await page.$('#BodyContent_lvDashboard_btnViewPT61_1')) {
    let dateArray: Date[] = [];

    for (let deedCounter = 0; deedCounter < 10; deedCounter++) {
      if (await page.$(`#BodyContent_lvDashboard_btnViewPT61_${deedCounter}`)) {
        let element = await page.waitForSelector(
          `#BodyContent_lvDashboard_lblDashboardSaleDate_${deedCounter}`
        );
        let date = await element.evaluate((e) => e.textContent);
        dateArray.push(new Date(date));
      }
    }
    const latestDate = dateArray.reduce((a, b) => {
      return a > b ? a : b;
    });
    return dateArray.indexOf(latestDate);
  }
  return 0;
}

async function scrapeData(page: Page, address: string): Promise<DeedData> {
  //?? is there a more elegant way to do this?
  const county = await page.waitForSelector(
    `#BodyContent_lvFinalViews_ucCombinedQuickView_0_ucPT61QuickView_0_lblCountyName_0`
  );

  const dateOfSale = await page.waitForSelector(
    `#BodyContent_lvFinalViews_ucCombinedQuickView_0_ucPT61QuickView_0_lblDateOfSale_0`
  );

  const deedBook = await page.waitForSelector(
    `#BodyContent_lvFinalViews_ucCombinedQuickView_0_ucPT61QuickView_0_lblDeedBook_0`
  );
  const deedPage = await page.waitForSelector(
    `#BodyContent_lvFinalViews_ucCombinedQuickView_0_ucPT61QuickView_0_lblDeedPage_0`
  );
  const propertyValue = await page.waitForSelector(
    `#BodyContent_lvFinalViews_ucCombinedQuickView_0_ucPT61QuickView_0_lblActualValue_0`
  );
  const propertyTaxDue = await page.waitForSelector(
    `#BodyContent_lvFinalViews_ucCombinedQuickView_0_ucPT61QuickView_0_lblTaxDue_0`
  );
  const propertyLandDistrict = await page.waitForSelector(
    `#BodyContent_lvFinalViews_ucCombinedQuickView_0_ucPT61QuickView_0_lblLandDistrict_0`
  );
  const propertyLandLot = await page.waitForSelector(
    `#BodyContent_lvFinalViews_ucCombinedQuickView_0_ucPT61QuickView_0_lblLandLot_0`
  );
  const buyerName = await page.waitForSelector(
    `#BodyContent_lvFinalViews_ucCombinedQuickView_0_ucPT61QuickView_0_lblBuyerName_0`
  );
  const buyerAddress = await page.waitForSelector(
    `#BodyContent_lvFinalViews_ucCombinedQuickView_0_ucPT61QuickView_0_lblBuyerAddress_0`
  );
  const sellerName = await page.waitForSelector(
    `#BodyContent_lvFinalViews_ucCombinedQuickView_0_ucPT61QuickView_0_lblSellerName_0`
  );
  const sellerAddress = await page.waitForSelector(
    `#BodyContent_lvFinalViews_ucCombinedQuickView_0_ucPT61QuickView_0_lblSellerAddress_0`
  );

  const DeedData = {
    county: await county.evaluate((e) => e.textContent),
    dateOfSale: new Date(await dateOfSale.evaluate((e) => e.textContent)),
    deedBook: parseInt(await deedBook.evaluate((e) => e.textContent)) || '',
    deedPage: parseInt(await deedPage.evaluate((e) => e.textContent)) || '',
    propertyAddress: address,
    propertyValue: parseInt(
      await propertyValue.evaluate((e) => e.textContent.replace(/[^0-9]/g, ''))
    ) || '',
    propertyTaxDue: parseInt(
      await propertyTaxDue.evaluate((e) => e.textContent.replace(/[^0-9]/g, ''))
    ) || '',
    propertyLandDistrict: await propertyLandDistrict.evaluate(
      (e) => e.textContent
    ),
    propertyLandLot: parseInt(
      await propertyLandLot.evaluate((e) => e.textContent)
    ) || '',
    buyerName: await buyerName.evaluate((e) => e.textContent),
    buyerAddress: await buyerAddress.evaluate((e) => e.textContent),
    sellerName: await sellerName.evaluate((e) => e.textContent),
    sellerAddress: await sellerAddress.evaluate((e) => e.textContent),
  };
  return DeedData;
}