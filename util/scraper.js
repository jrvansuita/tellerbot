const puppeteer = require('puppeteer');


module.exports = class Scraper {
    constructor(url) {
        this.url = url;
    }

    async createBrowser() {

        const browser = await puppeteer.launch({ headless: process.env.PRODUCTION !== undefined, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
        this.browser = browser;

        this.page = await browser.newPage();
        this.page.setViewport({ width: 1200, height: 800 })
    }

    async interceptAbortImages() {
        await page.setRequestInterception(true)
        page.on('request', async (request) => {
            if (request.resourceType() == 'image') {
                await request.abort()
            } else {
                await request.continue()
            }
        })
    }

    async screenShot() {
        await this.page.screenshot({
            path: 'test.png',
            fullPage: true
        });
    }

    async autoScroll() {
        await this.page.evaluate(async () => {
            await new Promise((resolve, reject) => {
                var totalHeight = 0;
                var distance = 200;

                var timer = setInterval(() => {
                    var scrollHeight = document.body.scrollHeight;
                    window.scrollBy(0, distance);
                    totalHeight += distance;

                    if (totalHeight >= (scrollHeight - 300) || totalHeight > 20000) {
                        clearInterval(timer);
                        resolve();
                    }
                }, 100);
            });
        });
    }

    async get(callback) {
        var content = '';
        try {

            await this.createBrowser();

            await this.page.goto(this.url, { waitUntil: 'load', timeout: 0 });

            await this.page.waitForTimeout(500)
            await this.autoScroll();
            //await this.screenShot();

            content = await this.page.content({ waitUntil: 'load', timeout: 10000 });
        } catch (e) {
            console.log('Scraper error')
            console.log(e)
        } finally {
            setTimeout(() => {
                callback(content)
            }, 200)

            if (this.browser && this.browser.close)
                this.browser.close();

        }
    }
}