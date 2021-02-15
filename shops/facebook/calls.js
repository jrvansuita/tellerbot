const Params = require("../params");
const lodashClonedeep = require('lodash.clonedeep');

module.exports = class FacebookCalls {
    constructor() {
        this.params = new Params('Facebook');
        this.base = 'https://www.facebook.com/marketplace/109389479079850';
        this.params.setConcatLinkItem('https://www.facebook.com');
        this.params.setIterateItemsSelector('.kbiprv82 > a')
            .setTitleItemSelector('.a3bd9o3v.knj5qynh ')
            .setPriceItemSelector('.g1cxx5fr.lrazzd5p ')
            .setImageItemSelector('img.idiwt2bm.bixrwtb6.ni8dbmo4.stjgntxs.k4urcfbm')
            .setLinkItemSelector();

        this.paramsList = [];
    }


    gpus() {
        this.params.setUrls(this.base + '/search?minPrice=${minPrice}&maxPrice=${maxPrice}&query=rx580')
            .addUrl(this.base + '/search?minPrice=${minPrice}&maxPrice=${maxPrice}&query=rx480')
            .addUrl(this.base + '/search?minPrice=${minPrice}&maxPrice=${maxPrice}&query=rx470')
            .addUrl(this.base + '/search?minPrice=${minPrice}&maxPrice=${maxPrice}&query=rx570')
            .addUrl(this.base + '/search?minPrice=${minPrice}&maxPrice=${maxPrice}&query=rx590')
            .addUrl(this.base + '/search?minPrice=${minPrice}&maxPrice=${maxPrice}&query=gtx1070')
            .addUrl(this.base + '/search?minPrice=${minPrice}&maxPrice=${maxPrice}&query=gtx1080')
            .setMinPrice(700)
            .setMaxPrice(2000)
            .setIgnoreTitleWords(['4gb', '2gb', 'lote', 'defeito', 'compro', '4g', '2g', 'somente troca', 'apenas troca'])
            .setIncludesTitleWords(['580 ', '570 ', '590 ', '480 ', '470 ', '1070 ', '1080', '1650 '])

        this.paramsList.push(lodashClonedeep(this.params))

        return this;
    }

    psuCorsair() {
        this.params.setUrls(this.base + '/search?minPrice=${minPrice}&maxPrice=${maxPrice}&query=fonte%20corsair%20750')
            .addUrl(this.base + '/search?minPrice=${minPrice}&maxPrice=${maxPrice}&query=fonte%20corsair%20850')
            .setMinPrice(200)
            .setMaxPrice(650)
            .setIgnoreTitleWords(['defeito'])
            .setIncludesTitleWords(['750', '850']);

        this.paramsList.push(lodashClonedeep(this.params))

        return this;
    }

    psuEvga() {
        this.params.setUrls(this.base + '/search?minPrice=${minPrice}&maxPrice=${maxPrice}&query=fonte%20evga%20750')
            .addUrl(this.base + '/search?minPrice=${minPrice}&maxPrice=${maxPrice}&query=fonte%20evga%20850')
            .setMinPrice(200)
            .setMaxPrice(650)
            .setIgnoreTitleWords(['defeito'])
            .setIncludesTitleWords(['750', '850',]);

        this.paramsList.push(lodashClonedeep(this.params))

        return this;
    }


    psus() {
        return this.psuCorsair().psuEvga();
    }


    get() {
        var result = this.paramsList;
        this.paramsList = [];
        return result;
    }

}