console.log('App started!')

const schedule = require('node-schedule');

const Searcher = require('./shops/searcher.js');
const MercadoLivreCalls = require('./shops/mercado-livre/calls.js');
const OlxCalls = require('./shops/olx/calls.js');

console.log('Schedule prepared!')

schedule.scheduleJob('*/15 * * * *', () => {

    var ml = new MercadoLivreCalls();
    var olx = new OlxCalls();

    new Searcher()
        .find(ml.gpus().mobos().get())
        .find(olx.gpus().get())
        .go()
});