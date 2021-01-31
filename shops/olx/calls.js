const Params = require("../params");
const lodashClonedeep = require('lodash.clonedeep');


module.exports = class OlxCalls {
    constructor() {
        this.params = new Params('Olx');
        this.base = 'https://sc.olx.com.br/norte-de-santa-catarina/computadores-e-acessorios/pecas-e-acessorios';
        this.params.setIterateItemsSelector('ul#ad-list > .sc-1fcmfeb-2 > a')
            .setTitleItemSelector('.sc-1mbetcw-0')
            .setPriceItemSelector('.sc-ifAKCX.eoKYee')
            .setLinkItemSelector();

        this.paramsList = [];

    }

    gpus() {
        this.params.setUrls(this.base + '?pe=${maxPrice}&ps=${minPrice}&q=rx%20580')
            .addUrl(this.base + '?pe=${maxPrice}&ps=${minPrice}&q=rx%20570')
            .addUrl(this.base + '?pe=${maxPrice}&ps=${minPrice}&q=rx%20470')
            .addUrl(this.base + '?pe=${maxPrice}&ps=${minPrice}&q=rx%20480')
            .setMinPrice(800)
            .setMaxPrice(1300)
            .setIgnoreTitleWords(['4gb', '2gb', '3g', '4g', 'lote', 'defeito'])
            .setIncludesTitleWords(['580', '570', '590', '480', '470', '1070', '1080']);

        this.paramsList.push(lodashClonedeep(this.params))

        return this;
    }

    get() {
        return this.paramsList;
    }


}