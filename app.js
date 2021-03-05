process.env.TZ = 'America/Sao_Paulo'

const Job = require('./scheduler/job.js');
const Executer = require('./shops/executer.js');
const util = require('./util/util.js');

global.executer = new Executer();
global.job = Job;

new Job().bind(async () => {
    new Executer().all().run();
}, () => {
    Job.now();
})



