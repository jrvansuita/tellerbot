const Params = require("../params");
const lodashClonedeep = require('lodash.clonedeep');

module.exports = class MercadoLivreCalls {
    constructor() {
        this.params = new Params('Mercado Livre');
        this.base = 'https://informatica.mercadolivre.com.br/componentes-pc/';
        this.params.setIterateItemsSelector('.ui-search-layout__item')
            .setTitleItemSelector('.ui-search-item__title.ui-search-item__group__element')
            .setPriceItemSelector('.price-tag.ui-search-price__part .price-tag-fraction')
            .setLinkItemSelector('.ui-search-result__image > a');


        this.paramsList = [];
    }

    gpus() {
        this.params.setUrls(this.base + 'placas-video/mais-de-8-gb/_OrderId_PRICE_PriceRange_${minPrice}-${maxPrice}')
            .setMinPrice(800)
            .setMaxPrice(1300)
            .setIgnoreTitleWords(['4gb', '2gb', 'lote', 'defeito', 'Semi Nova'])
            .setIncludesTitleWords(['580', '570', '590', '480', '470', '1070', '1080'])

        this.paramsList.push(lodashClonedeep(this.params))

        return this;
    }

    mobos() {
        this.params.setUrls(this.base + 'placas-mae/btc_PriceRange_${minPrice}-${maxPrice}')
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
            .setMaxPrice(500)
            .setIgnoreTitleWords(['defeito'])
            .setIncludesTitleWords(['750']);

        this.paramsList.push(lodashClonedeep(this.params))

        return this;
    }


    psuCorsair850() {
        this.params.setUrls(this.base + '/fontes-alimentacao/atx/corsair/850-W/_PriceRange_${minPrice}-${maxPrice}')
            .setMinPrice(300)
            .setMaxPrice(700)
            .setIgnoreTitleWords(['defeito'])
            .setIncludesTitleWords(['850']);

        this.paramsList.push(lodashClonedeep(this.params))

        return this;
    }


    psuEvga750() {
        this.params.setUrls(this.base + '/fontes-alimentacao/atx/evga/750-W/_PriceRange_${minPrice}-${maxPrice}')
            .setMinPrice(200)
            .setMaxPrice(500)
            .setIgnoreTitleWords(['defeito'])
            .setIncludesTitleWords(['750']);

        this.paramsList.push(lodashClonedeep(this.params))

        return this;
    }


    psuEvga850() {
        this.params.setUrls(this.base + '/fontes-alimentacao/atx/corsair/850-W/_PriceRange_${minPrice}-${maxPrice}')
            .setMinPrice(300)
            .setMaxPrice(700)
            .setIgnoreTitleWords(['defeito'])
            .setIncludesTitleWords(['850']);

        this.paramsList.push(lodashClonedeep(this.params))

        return this;
    }


    psus() {
        return this.psuEvga750().psuEvga850().psuCorsair750().psuCorsair850();
    }

    get() {
        return this.paramsList;
    }

}