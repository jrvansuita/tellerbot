const Params = require("../params");
const lodashClonedeep = require('lodash.clonedeep');

module.exports = class FacebookCalls {
    constructor() {
        this.params = new Params('Facebook');
        this.base = 'https://www.facebook.com/marketplace/109389479079850';
        this.params.setIterateItemsSelector('.kbiprv82 > a')
            .setTitleItemSelector('.a3bd9o3v.knj5qynh ')
            .setPriceItemSelector('.g1cxx5fr.lrazzd5p ')
            .setLinkItemSelector();


        this.paramsList = [];
    }


    gpus() {
        this.params.setUrls(this.base + '/search?minPrice=${minPrice}&maxPrice=${maxPrice}&query=rx%20590%208gb&exact=true')
            .setMinPrice(700)
            .setMaxPrice(1300)
            .setIgnoreTitleWords(['4gb', '2gb', 'lote', 'defeito', 'compro'])
            .setIncludesTitleWords(['580', '570', '590', '480', '470', '1070', '1080'])

        this.paramsList.push(lodashClonedeep(this.params))

        return this;
    }

    get() {
        var result = this.paramsList;
        this.paramsList = [];
        return result;
    }

}