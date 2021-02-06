const Job = require('./scheduler/job.js');
const Executer = require('./shops/executer.js');

global.executer = new Executer();
global.job = Job;

new Job().bind(async () => {
    new Executer().all().run();
}, (job) => {
    //job.now();
})



