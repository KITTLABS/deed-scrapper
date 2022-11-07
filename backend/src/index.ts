import puppeteer from 'puppeteer';

const _DATASOURCEPAGELOGIN = 'https://www.gsccca.org/';
const _DATASOURCEPAGESEARCH =
  'https://search.gsccca.org/PT61Premium/AddressSearch.aspx';
const _USERNAME = 'dmSmith';
const _PASSWORD = '799Ln38Lsjqs!yg^99wfs*9ahYo6L8';
//hard-coded for now
const _ADDRESS = '242 Mayson Ave NE';

// interface DeedData {
//   count: string;
//   pt61Number: string;
//   dateOfSale: Date;
// }

async function navigateToSource(address: string) {
  const browser = await puppeteer.launch({ headless: false, devtools: true });
  const page = await browser.newPage();
  const navPromise = page.waitForNavigation();

  //goto deed data site
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

  await page.waitForSelector('#BodyContent_lvDashboard_btnViewPT61_0');
  //click 'view pt-61 information'
  await page.click('#BodyContent_lvDashboard_btnViewPT61_0');

  // browser.close();
}

//TODO: returns  organized scraped data as an object
// async function scrapeData() {
//   let data = {};
//   return data;
// }

navigateToSource(_ADDRESS);