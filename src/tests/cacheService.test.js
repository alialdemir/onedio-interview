const { expect } = require('chai');
const { getFromCache, setToCache } = require('../services/cacheService');

// Test suite for Redis cache functions
describe('Redis Cache Functions', () => {
    // Test case: set and get data from cache
    it('should set and get data from cache', async () => {
        const key = 'testKey';
        const value = { message: 'Test data' };

        // Test the setToCache function
        await setToCache(key, JSON.stringify(value));

        // Test the getFromCache function
        const result = await getFromCache(key);

        // Expect the result to be equal to the original value
        expect(result).to.deep.equal(value);
    });

    // Test case: handle cache miss gracefully
    it('should handle cache miss gracefully', async () => {
        const nonExistentKey = 'nonExistentKey';

        // Test the getFromCache function for a non-existent key
        const result = await getFromCache(nonExistentKey);

        // Expect the result to be null in case of cache miss
        expect(result).to.be.null;
    });
});
