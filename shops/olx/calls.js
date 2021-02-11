const Params = require("../params");
const lodashClonedeep = require('lodash.clonedeep');


module.exports = class OlxCalls {
    constructor() {
        this.params = new Params('Olx');
        //this.base = 'https://sc.olx.com.br/norte-de-santa-catarina/computadores-e-acessorios/pecas-e-acessorios';
        this.base = 'https://olx.com.br/computadores-e-acessorios/pecas-e-acessorios';
        this.params.setIterateItemsSelector('ul#ad-list > .sc-1fcmfeb-2 > a')
            .setTitleItemSelector('.sc-1mbetcw-0')
            .setPriceItemSelector('.sc-ifAKCX.eoKYee')
            .setAdditionalItemSelector('.sc-7l84qu-1')
            .setLinkItemSelector();

        this.defIgnores = ['4gb', '2gb', '3g', '4g', 'lote', 'defeito', 'compro', 'kit', 'troco', 'troca', 'ssd'];

        this.paramsList = [];

    }


    gpusAmd() {
        this.params.setUrls(this.base + '?pe=${maxPrice}&ps=${minPrice}&q=rx%20580%208gb')
            .addUrl(this.base + '?pe=${maxPrice}&ps=${minPrice}&q=rx%20570%208gb')
            .addUrl(this.base + '?pe=${maxPrice}&ps=${minPrice}&q=rx%20470%208gb')
            .addUrl(this.base + '?pe=${maxPrice}&ps=${minPrice}&q=rx%20480%208gb')
            .addUrl(this.base + '?pe=${maxPrice}&ps=${minPrice}&q=rx%20560%208gb')
            .addUrl(this.base + '?pe=${maxPrice}&ps=${minPrice}&q=rx%20590%208gb')
            .setMinPrice(800)
            .setMaxPrice(1300)
            .setIgnoreTitleWords([...this.defIgnores])
            .setIncludesTitleWords(['580 ', '570 ', '590 ', '480 ', '470 ', '1070', '1080']);

        this.paramsList.push(lodashClonedeep(this.params))

        return this;
    }

    gpuAmd5700() {
        this.params.setUrls(this.base + '?pe=${maxPrice}&ps=${minPrice}&q=rx%205700xt%208gb')
            .setMinPrice(800)
            .setMaxPrice(2500)
            .setIgnoreTitleWords([...this.defIgnores])
            .setIncludesTitleWords(['5700', '590', '570', '8gb']);

        this.paramsList.push(lodashClonedeep(this.params))

        return this;
    }


    gpusNvidia1070() {
        this.params.setUrls(this.base + '?pe=${maxPrice}&ps=${minPrice}&q=gtx%201070%208gb')
            .setMinPrice(800)
            .setMaxPrice(1400)
            .setIgnoreTitleWords([...this.defIgnores])
            .setIncludesTitleWords(['1070', '1080', '8gb']);

        this.paramsList.push(lodashClonedeep(this.params))

        return this;
    }

    gpusNvidia1080() {
        this.params.setUrls(this.base + '?pe=${maxPrice}&ps=${minPrice}&q=gtx%201080%208gb')
            .setMinPrice(800)
            .setMaxPrice(1800)
            .setIgnoreTitleWords([...this.defIgnores])
            .setIncludesTitleWords(['1070', '1080', '8gb']);

        this.paramsList.push(lodashClonedeep(this.params))

        return this;
    }


    gpusNvidia1060() {
        this.params.setUrls(this.base + '?pe=${maxPrice}&ps=${minPrice}&q=gtx%201060%206gb')
            .setMinPrice(800)
            .setMaxPrice(1000)
            .setIgnoreTitleWords([...this.defIgnores])
            .setIncludesTitleWords(['1060', '6gb']);

        this.paramsList.push(lodashClonedeep(this.params))

        return this;
    }

    gpus() {
        return this
            .gpusAmd()
            .gpuAmd5700()
            .gpusNvidia1060()
            .gpusNvidia1070()
            .gpusNvidia1080();
    }

    get() {
        return this.paramsList;
    }


}