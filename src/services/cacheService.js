const Redis = require('ioredis');

// Load environment variables from .env file
const dotenv = require('dotenv');
dotenv.config();

// Create a new Redis client
const redisClient = new Redis({
    host: process.env.REDIS_URL || 'localhost',
    port: process.env.REDIS_PORT || 6379,
});

// Handle Redis connection errors
redisClient.on('error', (err) => {
    console.error('Redis error:', err);
});

// Function to retrieve data from the Redis cache
const getFromCache = (key) => {
    return new Promise((resolve, reject) => {
        redisClient.get(key, (err, data) => {
            if (err) {
                reject(err);
            } else {
                // Parse the JSON data retrieved from the cache
                resolve(data ? JSON.parse(data) : null);
            }
        });
    });
}

// Function to set data to the Redis cache with an expiration time
const setToCache = (key, value) => {
    return new Promise((resolve, reject) => {
        // Set data to the cache with a time-to-live (TTL) of 3600 seconds (1 hour)
        redisClient.setex(key, 3600, value, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

// Export the cache functions for external use
module.exports = {
    getFromCache,
    setToCache,
};
