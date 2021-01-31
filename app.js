console.log('App started!')

const schedule = require('node-schedule');

const Searcher = require('./shops/searcher.js');
const MercadoLivreCalls = require('./shops/mercado-livre/calls.js');
const OlxCalls = require('./shops/olx/calls.js');


var searcher = new Searcher();

var ml = new MercadoLivreCalls();
var olx = new OlxCalls();

console.log('Schedule prepared!')

schedule.scheduleJob('*/1 * * * *', () => {

    searcher
        .find(ml.gpus().mobos().get())
        .find(olx.gpus().get())
        .go()
});