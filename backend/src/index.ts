import puppeteer from 'puppeteer'

const dataSourceInitialPage = 'https://www.gsccca.org/';
const username = 'dmSmith';
const password = '799Ln38Lsjqs!yg^99wfs*9ahYo6L8';

async function navigateToSource(address: string) {
  const browser = await puppeteer.launch({});
  const page = await browser.newPage();

  await page.goto(dataSourceInitialPage);

  browser.close();
}

//returns data to scrape
async function scrapeData() {
  let data = {};
  return data;
}

navigateToSource(dataSourceInitialPage);
// scrapeData()
