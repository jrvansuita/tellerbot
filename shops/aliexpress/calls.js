const Params = require("../params");
const lodashClonedeep = require('lodash.clonedeep');

module.exports = class AliexpressCalls {
    constructor() {
        this.params = new Params('Aliexpress');
        this.base = 'https://pt.aliexpress.com/wholesale?';
        this.params.setConcatLinkItem('https:');
        this.params.setIterateItemsSelector('.list-item')
            .setTitleItemSelector('a.item-title')
            .setPriceItemSelector('.price-current')
            //.setImageItemSelector('img.idiwt2bm.bixrwtb6.ni8dbmo4.stjgntxs.k4urcfbm')
            .setLinkItemSelector('a.item-title');

        this.paramsList = [];
    }



    gpus() {
        this.params.setUrls(this.base + '&minPrice=${minPrice}&maxPrice=${maxPrice}&SearchText=rx%20580%208%20gb')
            .setMinPrice(700)
            .setMaxPrice(2000)
            .setIgnoreTitleWords(['4gb', '2gb', 'mãe', 'desktop', 'fonte', 'motherboard'])
            .setMustContainsAllTitleWords(['rx', '580', '8gb'])

        this.paramsList.push(lodashClonedeep(this.params))

        return this;
    }


    get() {
        var result = this.paramsList;
        this.paramsList = [];
        return result;
    }

}