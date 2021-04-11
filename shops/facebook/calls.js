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
            .setAdditionalItemSelector('.l9j0dhe7.ltmttdrg')
            .setLinkItemSelector();

        this.paramsList = [];
    }



    mobos() {
        this.params.setUrls(this.base + '/search?minPrice=${minPrice}&maxPrice=${maxPrice}&query=b250%20mining')
            .addUrl(this.base + '/search?minPrice=${minPrice}&maxPrice=${maxPrice}&query=biostar%20tb250')
            .addUrl(this.base + '/search?minPrice=${minPrice}&maxPrice=${maxPrice}&query=placa%20mae%20btc')
            .addUrl(this.base + '/search?minPrice=${minPrice}&maxPrice=${maxPrice}&query=placa%20mae%20mineracao')
            .setMinPrice(300)
            .setMaxPrice(2000)
            .setIgnoreTitleWords(['1150', 'lote', 'defeito', 'troco', 'compro',])
            .setIncludesTitleWords(['tb250 ', 'b250', 'btc', 'mineração'])

        this.paramsList.push(lodashClonedeep(this.params))

        return this;
    }


    gpus() {
        return this.gpus8gb().gpus4gb();
    }

    gpus8gb() {
        this.params.setUrls(this.base + '/search?minPrice=${minPrice}&maxPrice=${maxPrice}&query=rx580')
            .addUrl(this.base + '/search?minPrice=${minPrice}&maxPrice=${maxPrice}&query=rx480')
            .addUrl(this.base + '/search?minPrice=${minPrice}&maxPrice=${maxPrice}&query=rx470')
            .addUrl(this.base + '/search?minPrice=${minPrice}&maxPrice=${maxPrice}&query=rx570')
            .addUrl(this.base + '/search?minPrice=${minPrice}&maxPrice=${maxPrice}&query=rx590')
            .addUrl(this.base + '/search?minPrice=${minPrice}&maxPrice=${maxPrice}&query=gtx1070')
            .addUrl(this.base + '/search?minPrice=${minPrice}&maxPrice=${maxPrice}&query=gtx1080')
            .setMinPrice(700)
            .setMaxPrice(2000)
            .setIgnoreTitleWords(['4gb', '2gb', 'lote', 'defeito', 'troco', 'compro', '4g', '2g'])
            .setIncludesTitleWords(['580 ', '570 ', '590 ', '480 ', '470 ', '1070 ', '1080', '1650 ', '1660 '])

        this.paramsList.push(lodashClonedeep(this.params))

        return this;
    }

    gpus4gb() {
        this.params.setUrls(this.base + '/search?minPrice=${minPrice}&maxPrice=${maxPrice}&query=rx580')
            .addUrl(this.base + '/search?minPrice=${minPrice}&maxPrice=${maxPrice}&query=rx480')
            .addUrl(this.base + '/search?minPrice=${minPrice}&maxPrice=${maxPrice}&query=rx470')
            .addUrl(this.base + '/search?minPrice=${minPrice}&maxPrice=${maxPrice}&query=rx570')
            .addUrl(this.base + '/search?minPrice=${minPrice}&maxPrice=${maxPrice}&query=rx590')
            .addUrl(this.base + '/search?minPrice=${minPrice}&maxPrice=${maxPrice}&query=gtx1070')
            .addUrl(this.base + '/search?minPrice=${minPrice}&maxPrice=${maxPrice}&query=gtx1080')
            .addUrl(this.base + '/search?minPrice=${minPrice}&maxPrice=${maxPrice}&query=gtx1660')
            .addUrl(this.base + '/search?minPrice=${minPrice}&maxPrice=${maxPrice}&query=placa%20e%20video')
            .setMinPrice(500)
            .setMaxPrice(1200)
            .setIgnoreTitleWords(['8gb', '2gb', 'lote', 'defeito', 'troco', 'compro', '8g', '2g'])
            .setIncludesTitleWords(['580 ', '570 ', '590 ', '480 ', '470 ', '1070 ', '1080', '1650 ', '1660 '])

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