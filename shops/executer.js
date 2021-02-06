/*eslint no-unsafe-optional-chaining: "error"*/

const Searcher = require('./searcher.js');

const MercadoLivreCalls = require('./mercado-livre/calls.js');
const OlxCalls = require('./olx/calls.js');
const Prefs = require('../redis/prefs.js');

module.exports = class Executer {
    constructor() {
        this.types = [];
        this.sources = [new MercadoLivreCalls(), new OlxCalls()]
    }

    gpus() {
        this.types.push('gpus');
        return this;
    }

    mobos() {
        this.types.push('mobos');
        return this;
    }

    psus() {
        this.types.push('psus');
        return this;
    }
    all() {
        return this.gpus().psus().mobos();
    }

    run(onTerminate) {

        var batch = [];
        var typeIndex = 0;
        var sourceIndex = 0;


        var runner = async () => {
            var currentType = this.types[typeIndex];

            //Check if not end of array
            if (currentType) {
                //Check if Type is current active on Preferences 
                if (await Prefs?.[currentType]()) {
                    //Retrive the parameters from source shop
                    var params = this.sources?.[sourceIndex]?.[currentType]?.()?.get();

                    if (params) {
                        batch = batch.concat(params)
                        sourceIndex++;
                    } else {
                        sourceIndex = 0;
                        typeIndex++;
                    }
                } else {
                    typeIndex++;
                }

                runner();
            } else {

                new Searcher()
                    .find(batch)
                    .go(onTerminate);
            }
        }

        runner();
    }
}