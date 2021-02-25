
const Executer = require('./shops/executer.js');

global.executer = new Executer();

//new Executer().all().run();
new Executer().mobos().run();


