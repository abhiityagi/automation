const puppeteer = require("puppeteer");
// let {email}=
let email = "tyagiabhiin11@gmail.com";
let password = "techsavyy@1234";

let curTab;
let browserOPenPromise = puppeteer.launch({
  headless: false,
  defaultViewport: null,
  args: ["--start-maximized"],
  //chrome://version/
  // executablePath:
  //  "C:\Program Files\Google\Chrome\Application\chrome.exe",
});
browserOPenPromise //fulfill
    .then(function (browser) {
    console.log("browser is open");
    // console.log(browser);
    // An array of all open pages inside the Browser.
    // returns an array with all the pages in all browser contexts
    let allTabsPromise = browser.pages();
    return allTabsPromise;
})
.then(function (allTabsArr) {
    curTab = allTabsArr[0];
    console.log("new tab");
    //URL to navigate page to
    let visitingLoginPagePromise = curTab.goto("https://www.hackerrank.com/auth/login");
    return visitingLoginPagePromise;
})
.then(function (data) {
    // console.log(data);
    console.log("Hackerrank login page opened");
    // selector (where to type), data(what to type)
    let emailWillBeTypedPromise = curTab.type("input[name='username']", email);
    return emailWillBeTypedPromise;
})
.then(function () {
    console.log("email is typed");
    let passwordWillBeTypedPromise = curTab.type("input[type='password']", password);
    return passwordWillBeTypedPromise;
})
.then(function () {
    console.log("password has been typed");
    let willBeLoggedInPromise = curTab.click(
        ".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled"
    );
    return willBeLoggedInPromise;
})
.then(function () {
    console.log("logged into hackerrank successfully");
    // waitAndClick will wait for the selector to load , and then click on the node
    let algorithmTabWillBeOpenedPromise = waitAndClick(
        "div[data-automation='algorithms']"
    );
    return algorithmTabWillBeOpenedPromise;
})
.then(function () {
    console.log("algorithm pages is opened");
})
.catch(function (err) {
    console.log(err);
});
function waitAndClick(algoBtn) {
    let waitClickPromise = new Promise(function (resolve, reject) {
      let waitForSelectorPromise = curTab.waitForSelector(algoBtn);
      waitForSelectorPromise
        .then(function () {
          console.log("algo btn is found");
          let clickPromise = curTab.click(algoBtn);
          return clickPromise;
        })
        .then(function () {
          console.log("algo btn is clicked");
          // resolve();
        })
        .catch(function (err) {
          console.log(err);
        })
    });
  
    // waitClickPromise.then(function () {
    //   console.log("inside then of waitclick");
    // });
    return waitClickPromise;
  }