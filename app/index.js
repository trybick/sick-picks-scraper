const puppeteer = require('puppeteer');

const baseUrl = 'https://syntax.fm';

async function scrapeSickPicks() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(baseUrl, { waitUntil: 'networkidle0' });

  // Get text and urls from first episode
  const textList = await page.evaluate(() => {
    const items = [...document.querySelectorAll('#-siiiiick-piiiicks- + ul li')];
    return items.map(i => i.textContent);
  });
  const hrefList = await page.evaluate(() => {
    const links = [...document.querySelectorAll('#-siiiiick-piiiicks- + ul li a')];
    return links.map(a => a.href);
  });
  console.log('text:', textList);
  console.log('links:', hrefList);

  // Navigate to next episode
  const shows = await page.evaluate(() => {
    const list = [];
    const elements = document.getElementsByClassName('show');
    for (const el of elements) { list.push(el.textContent); }
    return list;
  });
  console.log('shows', shows);


  browser.close();
}

scrapeSickPicks();