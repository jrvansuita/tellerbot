console.log('App started!')

const schedule = require('node-schedule');
const Prefs = require('./redis/prefs.js');
const Searcher = require('./shops/searcher.js');
const MercadoLivreCalls = require('./shops/mercado-livre/calls.js');
const OlxCalls = require('./shops/olx/calls.js');

var ml = new MercadoLivreCalls();
var olx = new OlxCalls();

var main = async() => {

    var items = [];


    if (await Prefs.mobos()) {
        items = items.concat(ml.mobos().get());
    }

    if (await Prefs.psus()) {
        items = items.concat(ml.psus().get());
    }

    if (await Prefs.gpus()) {
        items = items.concat(ml.gpus().get());
        items = items.concat(olx.gpus().get());
    }

    new Searcher()
        .find(items)
        .go()
}

main();

console.log('Schedule prepared!')
schedule.scheduleJob('*/30 * * * *', main);