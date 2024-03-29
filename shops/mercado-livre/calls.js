const Params = require("../params");
const lodashClonedeep = require('lodash.clonedeep');


const defIgnore = ['2gb', 'lote', 'defeito', 'Semi Nova', 'compro', 'nao liga', '6570', 'hdmi', 'não liga', 'danificada', '560', '460', 'retir', 'reparo', 'concerto', 'nao da'];


module.exports = class MercadoLivreCalls {
    constructor() {
        this.params = new Params('Mercado Livre');
        this.base = 'https://informatica.mercadolivre.com.br/componentes-pc/usado';
        this.params.setIterateItemsSelector('.ui-search-layout__item')
            .setTitleItemSelector('.ui-search-item__title.ui-search-item__group__element')
            .setPriceItemSelector('.price-tag.ui-search-price__part .price-tag-fraction')
            .setLinkItemSelector('.ui-search-result__image > a');


        this.paramsList = [];
    }


    gpus8gb() {
        this.params.setUrls(this.base + '/placas-video/mais-de-8-gb/_OrderId_PRICE_PriceRange_${minPrice}-${maxPrice}')
            .setMinPrice(500)
            .setMaxPrice(1300)
            .setIgnoreTitleWords(['4gb', ...defIgnore])
            .setIncludesTitleWords(['580', '570', '590', '480', '470', '1070', '1080', '1060', '1660'])

        this.paramsList.push(lodashClonedeep(this.params))

        return this;
    }

    gpus4gb() {
        this.params.setUrls(this.base + '/placas-video/4-gb/rx-470-4gb_OrderId_PRICE_PriceRange_${minPrice}-${maxPrice}')
            .addUrl(this.base + '/placas-video/4-gb/rx-480-4gb_OrderId_PRICE_PriceRange_${minPrice}-${maxPrice}')
            .addUrl(this.base + '/placas-video/4-gb/rx-580-4gb_OrderId_PRICE_PriceRange_${minPrice}-${maxPrice}')
            .addUrl(this.base + '/placas-video/4-gb/rx-570-4gb_OrderId_PRICE_PriceRange_${minPrice}-${maxPrice}')
            .addUrl(this.base + '/placas-video/4-gb/_OrderId_PRICE_PriceRange_${minPrice}-${maxPrice}')
            .setMinPrice(500)
            .setMaxPrice(990)
            .setIgnoreTitleWords(['8gb', ...defIgnore])
            .setIncludesTitleWords(['580', '570', '590', '480', '470', '1660', '1650'])

        this.paramsList.push(lodashClonedeep(this.params))

        return this;
    }

    gpu3060() {
        this.params.setUrls(this.base + '/placas-video/mais-de-12-gb/_OrderId_PRICE_PriceRange_${minPrice}-${maxPrice}')
            .setMinPrice(1500)
            .setMaxPrice(2200)
            .setIgnoreTitleWords(['8gb', '4gb', '2gb', 'lote', 'defeito', 'Semi Nova', 'compro', 'nao liga', 'não liga', 'danificada', 'retir', 'reparo', 'concerto', 'nao da'])
            .setIncludesTitleWords(['3060', '3060ti', 'rtx3060'])

        this.paramsList.push(lodashClonedeep(this.params))

        return this;
    }


    gpuDefeitao() {
        this.params.setUrls(this.base + '/placas-video/gddr5/usado/mais-de-8-gb/_OrderId_PRICE_PriceRange_${minPrice}-${maxPrice}')
            .setMinPrice(300)
            .setMaxPrice(1500)
            .setIgnoreTitleWords(['Semi Nova', 'compro', '4gb', '2gb'])
            .setIncludesTitleWords(['defeito', 'falha', 'leia', 'artefato', 'nao liga', 'não liga', 'danificada', '6gb', '8gb', '12gb'])

        this.paramsList.push(lodashClonedeep(this.params))

        return this;
    }

    gpuDefeitinho() {
        this.params.setUrls(this.base + '/placas-video/pci-express-30/4-gb/usado/gddr5/_OrderId_PRICE_PriceRange_${minPrice}-${maxPrice}')
            .setMinPrice(300)
            .setMaxPrice(999)
            .setIgnoreTitleWords(['Semi Nova', 'compro', '8gb', '2gb', '6gb', 'geforce', '12gb', 'R9', '760', '560', '460', 'Hd', '550', '1050', '970', '730', '690', 'R7'])
            .setIncludesTitleWords(['defeito', 'falha', 'leia', 'artefato', 'nao liga', 'não liga', 'danificada', 'Dá Vídeo'])

        this.paramsList.push(lodashClonedeep(this.params))

        return this;
    }


    gpus() {
        return this
            .gpus4gb()
            .gpus8gb()
            .gpu3060()
        // .gpuDefeitao()
        // .gpuDefeitinho();
    }


    mobos() {
        this.params.setUrls(this.base + '/placas-mae/marca-asus/ddr4/asus-b250-mining-expert_PriceRange_${minPrice}-${maxPrice}_OrderId_PRICE')
            .addUrl(this.base + '/placas-mae/asrock/ddr4/asrock-h110-pro-btc_PriceRange_${minPrice}-${maxPrice}_OrderId_PRICE')
            .addUrl(this.base + '/placas-mae/gigabyte/ddr4/gigabyte-ga-h110-d3a_PriceRange_${minPrice}-${maxPrice}_OrderId_PRICE')
            .addUrl(this.base + '/placas-mae/biostar-tb250-btc-pro_PriceRange_${minPrice}-${maxPrice}_OrderId_PRICE')
            .addUrl(this.base + '/placas-mae/marca-asus/ddr4/asus-prime-z390-p_PriceRange_${minPrice}-${maxPrice}_OrderId_PRICE')
            .setMinPrice(300)
            .setMaxPrice(1600)
            .setIgnoreTitleWords(['defeito'])
            .setIncludesTitleWords(['b250', 'h110 pro', 'z390', 'tb250', 'h110-d2a', 'h110 d3a', 'mineração']);

        this.paramsList.push(lodashClonedeep(this.params))

        return this;
    }



    psuCorsair750() {
        this.params.setUrls(this.base + '/fontes-alimentacao/atx/corsair/750-W/_PriceRange_${minPrice}-${maxPrice}')
            .setMinPrice(200)
            .setMaxPrice(550)
            .setIgnoreTitleWords(['defeito'])
            .setIncludesTitleWords(['750', 'corsair']);

        this.paramsList.push(lodashClonedeep(this.params))

        return this;
    }


    psuCorsair850() {
        this.params.setUrls(this.base + '/fontes-alimentacao/atx/corsair/850-W/_PriceRange_${minPrice}-${maxPrice}')
            .setMinPrice(300)
            .setMaxPrice(650)
            .setIgnoreTitleWords(['defeito'])
            .setIncludesTitleWords(['850', 'corsair']);

        this.paramsList.push(lodashClonedeep(this.params))

        return this;
    }

    psuCorsair1000() {
        this.params.setUrls(this.base + '/fontes-alimentacao/atx/corsair/1000-W/_PriceRange_${minPrice}-${maxPrice}')
            .setMinPrice(500)
            .setMaxPrice(800)
            .setIgnoreTitleWords(['defeito'])
            .setIncludesTitleWords(['1000', 'corsair']);

        this.paramsList.push(lodashClonedeep(this.params))

        return this;
    }

    psuCorsair1200() {
        this.params.setUrls(this.base + '/fontes-alimentacao/atx/corsair/1200-W/_PriceRange_${minPrice}-${maxPrice}')
            .setMinPrice(500)
            .setMaxPrice(900)
            .setIgnoreTitleWords(['defeito'])
            .setIncludesTitleWords(['1200', 'corsair']);

        this.paramsList.push(lodashClonedeep(this.params))

        return this;
    }


    psuEvga750() {
        this.params.setUrls(this.base + '/fontes-alimentacao/atx/evga/750-W/_PriceRange_${minPrice}-${maxPrice}')
            .setMinPrice(200)
            .setMaxPrice(550)
            .setIgnoreTitleWords(['defeito'])
            .setIncludesTitleWords(['750', 'evga']);

        this.paramsList.push(lodashClonedeep(this.params))

        return this;
    }


    psuEvga850() {
        this.params.setUrls(this.base + '/fontes-alimentacao/atx/evga/850-W/_PriceRange_${minPrice}-${maxPrice}')
            .setMinPrice(300)
            .setMaxPrice(650)
            .setIgnoreTitleWords(['defeito'])
            .setIncludesTitleWords(['850', 'evga']);

        this.paramsList.push(lodashClonedeep(this.params))

        return this;
    }

    psuEvga1000() {
        this.params.setUrls(this.base + '/fontes-alimentacao/atx/evga/1000-W/_PriceRange_${minPrice}-${maxPrice}')
            .setMinPrice(500)
            .setMaxPrice(800)
            .setIgnoreTitleWords(['defeito'])
            .setIncludesTitleWords(['1000', 'evga']);

        this.paramsList.push(lodashClonedeep(this.params))

        return this;
    }

    psuEvga1200() {
        this.params.setUrls(this.base + '/fontes-alimentacao/atx/evga/1200-W/_PriceRange_${minPrice}-${maxPrice}')
            .setMinPrice(500)
            .setMaxPrice(900)
            .setIgnoreTitleWords(['defeito'])
            .setIncludesTitleWords(['1200', 'evga']);

        this.paramsList.push(lodashClonedeep(this.params))

        return this;
    }



    psuBitmain() {
        this.params.setUrls(this.base + '/fontes-alimentacao/bitmain-1600w_PriceRange_${minPrice}-${maxPrice}')
            .setMinPrice(300)
            .setMaxPrice(950)
            .setIgnoreTitleWords(['defeito', 'compro'])
            .setIncludesTitleWords(['1600', 'bitmain']);

        this.paramsList.push(lodashClonedeep(this.params))

        return this;
    }

    psus() {
        return this.psuEvga750().psuEvga850().psuCorsair750().psuCorsair850().psuCorsair1000().psuCorsair1200().psuEvga1000().psuEvga1200().psuBitmain();
    }


    proc() {
        this.params.setUrls(this.base + '-processadores/marca-intel/1151_PriceRange_${minPrice}-${maxPrice}')
            .setMinPrice(100)
            .setMaxPrice(320)
            .setIgnoreTitleWords(['defeito', 'compro'])
            .setIncludesTitleWords(['1151', 'G3900', 'G3920', 'G3930', 'G3950']);

        this.paramsList.push(lodashClonedeep(this.params))

        return this;
    }

    get() {
        var result = this.paramsList;
        this.paramsList = [];
        return result;
    }

}