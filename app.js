const Searcher = require('./shops/searcher.js');
const MercadoLivreCalls = require('./shops/mercado-livre/calls.js');
const OlxCalls = require('./shops/olx/calls.js');


var searcher = new Searcher();

var ml = new MercadoLivreCalls();
var olx = new OlxCalls();

searcher
    .find(ml.gpus().mobos().get())
    .find(olx.gpus().get())
    .go()






//----------------------
// var schedule = require('node-schedule');

// //Run every 1 min
// var j = schedule.scheduleJob('*/1 * * * *', scrapeMl);