/*eslint no-unsafe-optional-chaining: "error"*/

const Searcher = require('./searcher.js');

const MercadoLivreCalls = require('./mercado-livre/calls.js');
const OlxCalls = require('./olx/calls.js');
const Prefs = require('../redis/prefs.js');

module.exports = class Executer {
    constructor(checkPrefs) {
        this.gearTypes = [];
        this.skipPrefs(false);
        this.sources = [new MercadoLivreCalls(), new OlxCalls()]
    }

    skipPrefs(value) {
        this._skipPrefs = value;
        return this;
    }

    put(value) {
        this.gearTypes.push(value);
        return this;
    }

    gpus() {
        return this.put('gpus');
    }

    mobos() {
        return this.put('mobos');
    }

    psus() {
        return this.put('psus');
    }
    all() {
        return this.gpus().psus().mobos();
    }

    clear() {
        this.skipPrefs(false);
        this.gearTypes = [];
        return this;
    }

    run(onTerminate) {

        var batch = [];
        var gearTypesIndex = 0;
        var sourceIndex = 0;


        var runner = async () => {
            var currentType = this.gearTypes[gearTypesIndex];

            //Check if not end of array
            if (currentType) {

                //Get The async Pref
                var asyncPref = Prefs?.[currentType];

                //Check if Type is current active on Preferences 
                if ((asyncPref !== undefined) && (this._skipPrefs || await asyncPref())) {
                    //Retrive the parameters from source shop
                    var params = this.sources?.[sourceIndex]?.[currentType]?.()?.get();

                    if (params) {
                        batch = batch.concat(params)
                        sourceIndex++;
                    } else {
                        sourceIndex = 0;
                        gearTypesIndex++;
                    }
                } else {
                    gearTypesIndex++;
                }

                runner();
            } else {
                this.skipPrefs(false);
                new Searcher()
                    .find(batch)
                    .go(onTerminate);
            }
        }

        runner();
    }
}