const Prefs = require('./redis/prefs.js');



const test = async() => {

    var prefs = new Prefs();
    var value = await new Prefs().gpus();

    console.log(value)
}



test();






// const redis = require("redis");

// const client = redis.createClient({
//     host: 'redis-10767.c238.us-central1-2.gce.cloud.redislabs.com',
//     port: 10767,
//     //db: 'tellerdb',
//     password: 'jETMRssWxv6FvJWvTR7GxuztMce81FGC',
// });

// client.on("error", function(error) {
//     console.error(error);
// });


// //client.set("teste", "111");

// client.get("teste", (err, data) => {
//     console.log(data)
// });



// const { promisify } = require("util");
// const getAsync = promisify(client.get).bind(client);


// var fund = async() => {

//     var s = await getAsync('teste');
//     console.log(s)
// }

// fund();

// //getAsync('teste').then(console.log).catch(console.error);