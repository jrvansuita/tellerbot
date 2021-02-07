const redis = require("redis");

const client = redis.createClient({
    host: 'redis-10767.c238.us-central1-2.gce.cloud.redislabs.com',
    port: 10767,
    password: 'jETMRssWxv6FvJWvTR7GxuztMce81FGC',
});

const { promisify } = require("util");
const getAsync = promisify(client.get).bind(client);




module.exports = {

    ignores: async (value, clear) => {
        return await getArray('ignore-list', value, clear);
    },

    huntsEvery: async (value) => {
        return await getStr('hunts-every', value);
    },

    items: {
        gpus: async (value) => {
            return await getBoolean('gpus', value);
        },

        psus: async (value) => {
            return await getBoolean('psus', value);
        },

        mobos: async (value) => {
            return await getBoolean('mobos', value);
        }
    }

}




const getArray = async (key, value, clear) => {
    var arr = JSON.parse(await getAsync(key) || '[]');

    if (value !== undefined) {
        arr.push(value);
        client.set(key, clear ? '' : JSON.stringify(arr));
    }

    return arr;
};

const getObj = async (key, value) => {
    var object = JSON.parse(await getAsync(key) || '{}');

    if (value !== undefined) {
        object[value] = true;
        client.set(key, JSON.stringify(object));
    }

    return object;
};


const getStr = async (key, value) => {
    if (value !== undefined) {
        client.set(key, value);
    }

    return await getAsync(key) || '';
};


const getBoolean = async (key, value) => {
    if (value !== undefined) {
        client.set(key, value);
    }

    return await getAsync(key) == 'true';
};