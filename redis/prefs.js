const redis = require("redis");

const client = redis.createClient({
    host: 'redis-10767.c238.us-central1-2.gce.cloud.redislabs.com',
    port: 10767,
    password: 'jETMRssWxv6FvJWvTR7GxuztMce81FGC',
});

const { promisify } = require("util");
const getAsync = promisify(client.get).bind(client);


const getBoolean = async(key, value) => {
    if (value !== undefined) {
        client.set(key, value);
    }

    return await getAsync(key) == 'true';
};

module.exports = {

    gpus: async(value) => {
        return await getBoolean('gpus', value);
    },

    psus: async(value) => {
        return await getBoolean('psus', value);
    },

    mobos: async(value) => {
        return await getBoolean('mobos', value);
    }

}