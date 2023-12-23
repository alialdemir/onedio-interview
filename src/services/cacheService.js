const Redis = require('ioredis');

// Load environment variables from .env file
const dotenv = require('dotenv');
dotenv.config();

const redisClient = new Redis({
    host: process.env.REDIS_URL || 'localhost',
    port: process.env.REDIS_PORT || 6379,
});


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
