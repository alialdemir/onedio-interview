const redis = require('redis');
const redisClient = redis.createClient();

redisClient.on('error', (err) => {
    console.error('Redis error:', err);
});

const getFromCache = (key) => {
    return new Promise((resolve, reject) => {
        redisClient.get(key, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data ? JSON.parse(data) : null);
            }
        });
    });
}

const setToCache = (key, value) => {
    return new Promise((resolve, reject) => {
        redisClient.setex(key, 3600, value, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

module.exports = {
    getFromCache,
    setToCache,
};
