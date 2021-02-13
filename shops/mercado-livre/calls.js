const Params = require("../params");
const lodashClonedeep = require('lodash.clonedeep');

module.exports = class MercadoLivreCalls {
    constructor() {
        this.params = new Params('Mercado Livre');
        this.base = 'https://informatica.mercadolivre.com.br/componentes-pc';
        this.params.setIterateItemsSelector('.ui-search-layout__item')
            .setTitleItemSelector('.ui-search-item__title.ui-search-item__group__element')
            .setPriceItemSelector('.price-tag.ui-search-price__part .price-tag-fraction')
            .setLinkItemSelector('.ui-search-result__image > a');


        this.paramsList = [];
    }


    gpus() {
        this.params.setUrls(this.base + '/placas-video/mais-de-8-gb/_OrderId_PRICE_PriceRange_${minPrice}-${maxPrice}')
            .setMinPrice(800)
            .setMaxPrice(1650)
            .setIgnoreTitleWords(['4gb', '2gb', 'lote', 'defeito', 'Semi Nova', 'compro', 'nao liga', 'não liga', 'danificada'])
            .setIncludesTitleWords(['580', '570', '590', '480', '470', '1070', '1080', '1060', '1660'])

        this.paramsList.push(lodashClonedeep(this.params))

        return this;
    }

    mobos() {
        this.params.setUrls(this.base + '/placas-mae/btc_PriceRange_${minPrice}-${maxPrice}')
            .setMinPrice(300)
            .setMaxPrice(600)
            .setIgnoreTitleWords(['defeito'])
            .setIncludesTitleWords(['12', 'pro']);

        this.paramsList.push(lodashClonedeep(this.params))

        return this;
    }

    psuCorsair750() {
        this.params.setUrls(this.base + '/fontes-alimentacao/atx/corsair/750-W/_PriceRange_${minPrice}-${maxPrice}')
            .setMinPrice(200)
            .setMaxPrice(450)
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
            .setMaxPrice(450)
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