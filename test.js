const Prefs = require('./redis/prefs');

var f = async () => {
    console.log(await Prefs.ignores());
}

f();
