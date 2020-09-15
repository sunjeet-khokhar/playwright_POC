//@ts-check
// for context refer to my blog post here --> https://thereluctanttester.com/2020/09/14/quick-starter-web-automation-using-playwright/

const { chromium } = require('playwright');
const { assert } = require('console');


(async  () => {
  // launch a chrome instance from the path provided , not in headless mode and with the slowMo value set for slower playback
  //const browser = await chromium.launch({headless: false,executablePath: '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary',slowMo: 500});
  const browser = await chromium.launch();
  // playwright has the concept of giving context to your browser object --> https://playwright.dev/#version=v1.4.0&path=docs%2Fcore-concepts.md&q=browser-contexts
  const context = await browser.newContext();
  // from a context spawn your page object, the primary medium to perform broswer automation
  const page = await context.newPage();
  await page.goto('http://whatsmyuseragent.org/');
  await page.screenshot({ path: `example.png` });
  console.log("debug")
  await browser.close();
})();


// another way to write the async function 
/*async function test1() {
  const browser = await chromium.launch({headless: false,executablePath: '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary'});
  const page = await browser.newPage();
  await page.goto('http://whatsmyuseragent.org/');
  await page.screenshot({ path: `example.png` });
  await browser.close();
};

test1();*/
