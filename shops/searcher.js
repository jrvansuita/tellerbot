const TellerBot = require('../bot/bot');
const Prefs = require('../redis/prefs');
const Util = require('../util/util.js');

const cheerio = require('cheerio');
const Scraper = require('../util/scraper');

module.exports = class Searcher {
    constructor() {
        this.teller = new TellerBot();
    }

    find(...params) {
        this.paramsList = (this.paramsList || []).concat(...params);
        return this;
    }

    requestLoading(url) {
        console.log('------------------------');
        console.log('Executing search on:');
        console.log(url);
    }


    isFiltersChecked(params, itemTitle) {
        return (!params.ignoreTitleWords.some((w) => { return itemTitle.toLowerCase().includes(w.toLowerCase()) })) &&
            (params.includesTitleWords.some((w) => { return itemTitle.toLowerCase().includes(w.toLowerCase()) }))
    }

    async isIgnoredItem(itemTitle) {
        var ignoreList = await Prefs.ignores();

        return ignoreList.some((e) => {
            return e.includes(itemTitle);
        })
    }

    parseItem(params, itemSelector) {
        var title = itemSelector.find(params.titleItemSelector).text().trim();
        var link = (params.linkItemSelector ? itemSelector.find(params.linkItemSelector) : itemSelector).first().attr('href');
        var img = params.imgItemSelector ? itemSelector.find(params.imgItemSelector).first().attr('src') : link;

        var price = itemSelector.find(params.priceItemSelector).first().text().trim().replace(/\D/g, "");
        price = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)

        var add = itemSelector.find(params.additionalItemSelector).first().text();
        if (add) {
            add = add.split('-');
            add = ' em ' + add[0].trim() + '/' + add[1].trim();
        }

        title += add;

        if (params.concatLink) {
            link = params.concatLink + link;
        }

        return { title, price, link, img }
    }

    async handleResponseBody(params, body) {

        const $ = cheerio.load(body);

        var matched = 0;
        var iterator = $(params.iterateItemsSelector);

        for (let index = 0; index < iterator.length; index++) {
            const el = iterator[index];

            var item = this.parseItem(params, $(el));

            if (this.isFiltersChecked(params, item.title) && !(await this.isIgnoredItem(item.title))) {
                matched++;
                console.log(this.teller.getText(params.storeName, item));
                this.teller.newItemFound(params.storeName, item);
            }

            Util.sleep(500);
        }

        console.log(`${iterator.length} items found and ${matched} matched!`);
    }


    makeRequest(url, params, callback) {
        new Scraper(url).get((body) => {
            this.handleResponseBody(params, body)

            setTimeout(callback, 250);
        });
    }

    executeSearch(params, callback) {

        var urlsIndex = 0;

        var execute = () => {
            var currentUrl = params.getBuildedUrl(urlsIndex);

            if (currentUrl) {
                this.requestLoading(currentUrl);

                this.makeRequest(currentUrl, params, () => {
                    urlsIndex++;
                    execute()
                });
            } else {
                callback()
            }
        }

        execute();
    }


    go(onTerminate) {

        var paramsIndex = 0;

        var execute = () => {


            var currentParams = this.paramsList[paramsIndex];

            if (currentParams) {
                this.executeSearch(currentParams, () => {
                    paramsIndex++;
                    execute();
                })
            } else {
                console.log('Search Terminated')
                if (onTerminate) onTerminate();
            }
        }

        execute();
    }

}