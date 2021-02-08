module.exports = class Params {
    constructor(storeName) {
        this.setStoreName(storeName)
            .setMinPrice(0)
            .setMaxPrice(9999)
    }

    setUrls(urls) {
        this.urls = [].concat(urls);
        return this;
    }

    addUrl(url) {
        this.urls = (this.urls || []).concat(url);
        return this;
    }

    setStoreName(storeName) {
        this.storeName = storeName;
        return this;
    }

    setMinPrice(price) {
        this.minPrice = price;
        return this;
    }

    setMaxPrice(price) {
        this.maxPrice = price;
        return this;
    }

    setIgnoreTitleWords(arr) {
        this.ignoreTitleWords = arr;
        return this;
    }

    setIncludesTitleWords(arr) {
        this.includesTitleWords = arr;
        return this;
    }

    setIterateItemsSelector(selector) {
        this.iterateItemsSelector = selector;
        return this;
    }


    setTitleItemSelector(selector) {
        this.titleItemSelector = selector;
        return this;
    }


    setPriceItemSelector(selector) {
        this.priceItemSelector = selector;
        return this;
    }

    setLinkItemSelector(selector) {
        this.linkItemSelector = selector;
        return this;
    }

    setAdditionalItemSelector(selector) {
        this.additionalItemSelector = selector;
        return this;
    }

    getBuildedUrl(index) {
        return this.urls[index] ? this.urls[index].replace('${minPrice}', this.minPrice).replace('${maxPrice}', this.maxPrice) : null;
    }

}