const Params = require("../params");
const lodashClonedeep = require('lodash.clonedeep');


module.exports = class OlxCalls {
    constructor() {
        this.params = new Params('Olx');
        this.base = 'https://olx.com.br/computadores-e-acessorios/pecas-e-acessorios';
        this.baseSC = 'https://sc.olx.com.br/computadores-e-acessorios/pecas-e-acessorios';
        this.baseVale = 'https://sc.olx.com.br/norte-de-santa-catarina/computadores-e-acessorios/pecas-e-acessorios';

        this.params.setIterateItemsSelector('ul#ad-list > .sc-1fcmfeb-2 > a')
            .setTitleItemSelector('.sc-1mbetcw-0')
            .setPriceItemSelector('.sc-ifAKCX.eoKYee')
            .setAdditionalItemSelector('.sc-7l84qu-1')
            .setLinkItemSelector();

        this.defIgnores = ['4gb', '2gb', '3g', '4g', 'lote', 'defeito', 'compro', 'kit', 'troco', 'troca', 'ssd', ' ram ', 'c0mpro', 'seminovo', 'moria'];

        this.paramsList = [];

    }



    mobos() {
        this.params.setUrls(this.base + '?pe=${maxPrice}&ps=${minPrice}&q=b250%20mining')
            .addUrl(this.base + '?pe=${maxPrice}&ps=${minPrice}&q=biostar%20tb250')
            .addUrl(this.base + '?pe=${maxPrice}&ps=${minPrice}&q=placa%20mae%20btc')
            .addUrl(this.base + '?pe=${maxPrice}&ps=${minPrice}&q=placa%20mae%20mineracao')
            .setMinPrice(300)
            .setMaxPrice(2000)
            .setIgnoreTitleWords(['1150', 'lote', 'defeito', 'troco', 'compro',])
            .setIncludesTitleWords(['tb250 ', 'b250', 'btc', 'mineração', 'h110'])

        this.paramsList.push(lodashClonedeep(this.params))

        return this;
    }

    gpusAmd() {
        this.params.setUrls(this.base + '?pe=${maxPrice}&ps=${minPrice}&q=rx%20580%208gb')
            .addUrl(this.base + '?pe=${maxPrice}&ps=${minPrice}&q=rx%20570%208gb')
            .addUrl(this.base + '?pe=${maxPrice}&ps=${minPrice}&q=rx%20470%208gb')
            .addUrl(this.base + '?pe=${maxPrice}&ps=${minPrice}&q=rx%20480%208gb')
            .addUrl(this.base + '?pe=${maxPrice}&ps=${minPrice}&q=rx%20560%208gb')
            .addUrl(this.base + '?pe=${maxPrice}&ps=${minPrice}&q=rx%20590%208gb')
            .setMinPrice(800)
            .setMaxPrice(4000)
            .setIgnoreTitleWords([...this.defIgnores])
            .setIncludesTitleWords(['580 ', '570 ', '590 ', '480 ', '470 ', '1070', '1080']);

        this.paramsList.push(lodashClonedeep(this.params))

        return this;
    }

    gpuAmd5700() {
        this.params.setUrls(this.base + '?pe=${maxPrice}&ps=${minPrice}&q=rx%205700xt%208gb')
            .setMinPrice(800)
            .setMaxPrice(4000)
            .setIgnoreTitleWords([...this.defIgnores])
            .setIncludesTitleWords(['5700', '590', '570', '8gb']);

        this.paramsList.push(lodashClonedeep(this.params))

        return this;
    }

    gpusNvidia1660() {
        this.params.setUrls(this.base + '?pe=${maxPrice}&ps=${minPrice}&q=gtx%201660%20ti')
            .setMinPrice(800)
            .setMaxPrice(4000)
            .setIgnoreTitleWords([...this.defIgnores])
            .setIncludesTitleWords(['1070', '1080', '6gb', '1660', '8gb']);

        this.paramsList.push(lodashClonedeep(this.params))

        return this;
    }


    gpusNvidia1070() {
        this.params.setUrls(this.base + '?pe=${maxPrice}&ps=${minPrice}&q=gtx%201070%208gb')
            .setMinPrice(800)
            .setMaxPrice(3500)
            .setIgnoreTitleWords([...this.defIgnores])
            .setIncludesTitleWords(['1070', '1080', '8gb']);

        this.paramsList.push(lodashClonedeep(this.params))

        return this;
    }

    gpusNvidia1080() {
        this.params.setUrls(this.base + '?pe=${maxPrice}&ps=${minPrice}&q=gtx%201080%208gb')
            .setMinPrice(800)
            .setMaxPrice(3500)
            .setIgnoreTitleWords([...this.defIgnores])
            .setIncludesTitleWords(['1070', '1080', '8gb']);

        this.paramsList.push(lodashClonedeep(this.params))

        return this;
    }


    gpusNvidia1060() {
        this.params.setUrls(this.base + '?pe=${maxPrice}&ps=${minPrice}&q=gtx%201060%206gb')
            .setMinPrice(800)
            .setMaxPrice(3000)
            .setIgnoreTitleWords([...this.defIgnores])
            .setIncludesTitleWords(['1060', '6gb']);

        this.paramsList.push(lodashClonedeep(this.params))

        return this;
    }

    gpusBRGeral() {
        this.params.setUrls('https://www.olx.com.br/brasil?q=rx%20580%208gb&pe=${maxPrice}&ps=${minPrice}')
            .addUrl('https://www.olx.com.br/brasil?q=rx%20480%208gb&pe=${maxPrice}&ps=${minPrice}')
            .addUrl('https://www.olx.com.br/brasil?q=rx%20470%208gb&pe=${maxPrice}&ps=${minPrice}')
            .addUrl('https://www.olx.com.br/brasil?q=rx%20570%208gb&pe=${maxPrice}&ps=${minPrice}')
            .setMinPrice(900)
            .setMaxPrice(4000)
            .setIgnoreTitleWords([...this.defIgnores])
            .setIncludesTitleWords(['580', '570', '480', '470'])

        this.paramsList.push(lodashClonedeep(this.params))

        return this;
    }


    gpus4gb() {
        this.params.setUrls(this.baseSC + '?pe=${maxPrice}&ps=${minPrice}&q=rx%20580%204gb')
            .addUrl(this.baseSC + '?pe=${maxPrice}&ps=${minPrice}&q=rx%20570%204gb')
            .addUrl(this.baseSC + '?pe=${maxPrice}&ps=${minPrice}&q=rx%20470%204gb')
            .addUrl(this.baseSC + '?pe=${maxPrice}&ps=${minPrice}&q=rx%20480%204gb')
            .addUrl(this.baseSC + '?pe=${maxPrice}&ps=${minPrice}&q=rx%20560%204gb')
            .addUrl(this.baseSC + '?pe=${maxPrice}&ps=${minPrice}&q=rx%20590%204gb')
            .addUrl(this.baseSC + '?pe=${maxPrice}&ps=${minPrice}&q=nvidia')
            .setMinPrice(500)
            .setMaxPrice(3000)
            .setIgnoreTitleWords(['8gb', '2gb', '3g', '8g', 'lote', 'defeito', 'compro', 'kit', 'troco', 'troca', 'ssd', ' ram ', 'c0mpro', 'seminovo'])
            .setIncludesTitleWords(['580 ', '570 ', '590 ', '480 ', '470 ', '1070', '1080', '1650', '1050']);

        this.paramsList.push(lodashClonedeep(this.params))

        return this;
    }

    gpus() {
        return this
            .gpusAmd()
            .gpuAmd5700()
            .gpusNvidia1060()
            .gpusNvidia1070()
            .gpusNvidia1080()
            .gpusNvidia1660()
            .gpusBRGeral()
            .gpus4gb();
    }


    psuCorsair() {
        this.params.setUrls(this.baseSC + '?pe=${maxPrice}&ps=${minPrice}&q=fonte%20corsair')
            .setMinPrice(200)
            .setMaxPrice(500)
            .setIgnoreTitleWords(['defeito'])
            .setIncludesTitleWords(['750', '850']);

        this.paramsList.push(lodashClonedeep(this.params))

        return this;
    }

    psuEvga() {
        this.params.setUrls(this.baseSC + '?pe=${maxPrice}&ps=${minPrice}&q=fonte%20evga')
            .setMinPrice(200)
            .setMaxPrice(500)
            .setIgnoreTitleWords(['defeito'])
            .setIncludesTitleWords(['750', '850']);

        this.paramsList.push(lodashClonedeep(this.params))

        return this;
    }


    psus() {
        return this.psuCorsair().psuEvga();
    }




    get() {
        return this.paramsList;
    }


}