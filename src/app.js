const webdriver = require('selenium-webdriver');
const fs = require('fs');
const {By, Key, until,Capabilities} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
//const proxy = require('selenium-webdriver/proxy');

const o = new chrome.Options();

//let PROXY_URL = 'p.webshare.io:9999'

// o.setProxy(proxy.manual({https: `${PROXY_URL}`}));
o.addArguments("user-data-dir=C:\\Users\\ZVW\\AppData\\Local\\Google\\Chrome\\User Data");
o.addArguments("--profile-directory=Default");
o.addArguments("--start-maximized");


(async function example() {
    const driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome().setPageLoadStrategy("none")).setChromeOptions(o).build();
    try {
        await driver.get('https://www.tiktok.com/@trangcongg/video/7004672213160873218?is_copy_url=1&is_from_webapp=v1');
        sleep(5000);
      const click= await driver.findElement(By.xpath("//*[@id=\"main\"]/div[2]/div[2]/div/div/main/div/div[1]/span[1]/div/div[1]/div[5]/div[1]/div[1]/div/span[2]"));

      await driver.actions().click(click).perform();
        do {
            sleep(10000);
            const links =await driver.findElement(By.tagName("video")).getAttribute("src");

            await driver.actions().keyDown(Key.DOWN).perform();
            console.log(links);
            saveLink(links);
        }while (true)

        sleep(10000000);
    } finally {
        await driver.quit();
    }

})();

function sleep(n) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
}

function saveLink(link) {
    const data = link + "\n";
    try {
        fs.appendFileSync('link.txt', data);
    } catch (e) {
        console.error(e);
    }
}

//C:\Users\ZVW\AppData\Local\Google\Chrome\User Data\Default
//Profile 6

