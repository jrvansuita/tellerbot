const TellerBot = require('../bot/bot');
const request = require('request');
const cheerio = require('cheerio');

module.exports = class Searcher {
    constructor(debug) {
        this.debug = debug;
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

    checkRequestErrors(e) {
        if (e) { return console.error('There was an error!', e); }
    }

    isFiltersChecked(params, itemTitle) {
        return (!params.ignoreTitleWords.some((w) => { return itemTitle.toLowerCase().includes(w.toLowerCase()) })) &&
            (params.includesTitleWords.some((w) => { return itemTitle.toLowerCase().includes(w.toLowerCase()) }))
    }

    parseItem(params, itemSelector) {
        var title = itemSelector.find(params.titleItemSelector).text().trim();
        var link = (params.linkItemSelector ? itemSelector.find(params.linkItemSelector) : itemSelector).first().attr('href');

        var price = itemSelector.find(params.priceItemSelector).first().text().trim().replace(/\D/g, "");
        price = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)



        return { title, price, link }
    }

    handleResponseBody(params, body) {
        var $ = cheerio.load(body);

        var matched = 0;
        var iterator = $(params.iterateItemsSelector);

        iterator.each((i, el) => {
            var item = this.parseItem(params, $(el));

            if (this.isFiltersChecked(params, item.title)) {
                matched++;

                if (this.debug) {
                    console.log(this.teller.getMessage(params.storeName, item));
                } else {
                    this.teller.newItemFound(params.storeName, item);
                }

            }
        });

        console.log(`${iterator.length} items found and ${matched} matched!`);
    }



    makeRequest(url, params, callback) {
        request(url, (e, r, body) => {
            this.checkRequestErrors(e)
            this.handleResponseBody(params, body)

            callback();
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