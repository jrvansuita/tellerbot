console.log('App started!')

const schedule = require('node-schedule');
const Prefs = require('./prefs/prefs.js');
const Searcher = require('./shops/searcher.js');
const MercadoLivreCalls = require('./shops/mercado-livre/calls.js');
const OlxCalls = require('./shops/olx/calls.js');

var ml = new MercadoLivreCalls();
var olx = new OlxCalls();

var main = () => {

    var items = [];

    if (Prefs.mobos) {
        items = items.concat(ml.mobos().get());
    }

    if (Prefs.psus) {
        items = items.concat(ml.psus().get());
    }

    if (Prefs.gpus) {
        items = items.concat(ml.gpus().get());
        items = items.concat(olx.gpus().get());
    }

    new Searcher()
        .find(items)
        .go()
}

//main();

console.log('Schedule prepared!')
schedule.scheduleJob('*/30 * * * *', main);