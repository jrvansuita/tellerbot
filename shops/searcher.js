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
            (!params.includesTitleWords || params.includesTitleWords.some((w) => { return itemTitle.toLowerCase().includes(w.toLowerCase()) })) &&
            (!params.mustContainsAll || params.mustContainsAll.every((w) => { return itemTitle.toLowerCase().includes(w.toLowerCase()) }))
    }

    async isIgnoredItem(itemTitle) {
        var ignoreList = await Prefs.ignores();

        //Clear the ignore list when its full of old itens.
        if (ignoreList.length > 300) {
            Prefs.ignores(null, true);
        }

        return ignoreList.some((e) => {
            return e.includes(itemTitle);
        })
    }

    parseItem(params, itemSelector) {
        var title = itemSelector.find(params.titleItemSelector).text().trim();
        var link = (params.linkItemSelector ? itemSelector.find(params.linkItemSelector) : itemSelector).first().attr('href');
        if (params.concatLink) {
            link = params.concatLink + link;
        }

        var img = params.imgItemSelector ? itemSelector.find(params.imgItemSelector).first().attr('src') : link;

        var price = 'R$ ' + itemSelector.find(params.priceItemSelector).first().text().trim().match(/[\d|,|.|e|E|\+]+/g).join();

        var add = itemSelector.find(params.additionalItemSelector).first().text();
        if (add) {
            add = add.split('-').length > 1 ? add.split('-') : add.split(',');
            add = ' em ' + add[0].trim() + '/' + add[1].trim();
        }

        title += add;

        return { title, price, link, img }
    }

    async handleResponseBody(params, body) {

        const $ = cheerio.load(body);

        var matched = 0;
        var iterator = $(params.iterateItemsSelector);

        for (let index = 0; index < iterator.length; index++) {
            const el = iterator[index];

            var item = this.parseItem(params, $(el));

            var desc = this.teller.getText(params.storeName, item);


            if (this.isFiltersChecked(params, item.title) && !(await this.isIgnoredItem(item.title))) {
                if (this.teller.handleNewItemFound(params.storeName, item)) {
                    matched++;
                    console.log('✅' + desc);
                    Util.sleep(500);
                } else {
                    console.log('↩️❌' + desc);
                }

            } else {
                console.log('💲❌' + desc);
            }
        }

        console.log(`${iterator.length} items found and ${matched} matched!`);
    }


    makeRequest(url, params, callback) {
        new Scraper(url).get((body) => {
            this.handleResponseBody(params, body)

            setTimeout(callback, 50);
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