console.log('App started!')

const schedule = require('node-schedule');
const Executer = require('./shops/executer.js');


var main = async () => {
    new Executer().all().run(() => {
        console.log('Terminated')
    });
}

main();

console.log('Schedule prepared!')
schedule.scheduleJob('*/30 * * * *', main);