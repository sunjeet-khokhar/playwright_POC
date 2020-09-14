//@ts-check
// for context refer to my blog post here --> https://thereluctanttester.com/2020/09/14/quick-starter-web-automation-using-playwright/

const { chromium } = require('playwright');
const { assert } = require('console');


(async  () => {
  // launch a chrome instance from the path provided , not in headless mode and with the slowMo value set for slower playback
  const browser = await chromium.launch({headless: false,executablePath: '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary',slowMo: 500});
  // playwright has the concept of giving context to your browser object --> https://playwright.dev/#version=v1.4.0&path=docs%2Fcore-concepts.md&q=browser-contexts
  const context = await browser.newContext();
  // from a context spawn your page object, the primary medium to perform broswer automation
  const page = await context.newPage();
  // lets head over to the home page of out website 
  await page.goto('https://theiconic.com.au')
  // oh,dealing with a pesky pop up is easy peasey,did not have to write waits etc,just had to enter text of the button to be used as a selector !
  //playwright's inbuilt auto-wait capability -- https://playwright.dev/#version=v1.4.0&path=docs%2Factionability.md&q=
  await page.click('text=No Thanks')
  // perform navigation to another page of the app using text as a selector.
  // More on selectors here - https://playwright.dev/#version=v1.4.0&path=docs%2Fselectors.md&q=
  await page.click('text=#stayhome')
  // head over to the login page
  await page.goto('https://www.theiconic.com.au/customer/account/login/')
  // select an element by id and click on it
  await page.click('id=LoginForm_email')
  // or just directly filling it with text
  await page.fill('id=LoginForm_email','zookeeper@nationalzoo.com')
  // another element found easily by id and text entered
  await page.fill('id=LoginForm_password','tununutunu')
  // find by id and click the login button
  await page.click('id=LoginForm_submit')
  // lets find the text contents of the selector below , just have pass the selector to the page.textContent method 
  const login_error = await page.textContent('#form-account-login > div:nth-child(2) > div:nth-child(2) > div');
  console.log(login_error)
  // perform a simple assertion
  assert(login_error=='The email address or password you entered is incorrect. Please try again.1')
  // we are done :) 
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
