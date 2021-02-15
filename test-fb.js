//const url = "https://www.facebook.com/marketplace/?ref=bookmark";

const url = 'https://www.facebook.com/marketplace/109389479079850/search/?query=rx580'

const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

(async () => {
    const browser = await puppeteer.launch({ headless: !process.env.PRODUCTION || false });
    const page = await browser.newPage();

    await page.goto(url);

    const content = await page.content({ waitUntil: 'load', timeout: 5000 });

    // await Promise.race([
    //     page.waitForNavigation({ waitUntil: "networkidle0" }),
    //     page.waitForSelector(".Error")
    // ]);

    await page.waitForTimeout(4000)

    const $ = cheerio.load(content);



    var iterator = $('.kbiprv82 > a');
    console.log(iterator.length);
    for (let index = 0; index < iterator.length; index++) {
        const el = iterator[index];

        var title = $(el).find('.a3bd9o3v.knj5qynh').text().trim();
        console.log(title);
    }

    //console.log($('.a8c37x1j.ni8dbmo4.stjgntxs.l9j0dhe7').toArray().map((e) => { return $(e).text() }));

    browser.close();
})();
