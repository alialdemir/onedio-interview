const { db, FootballMatchSchema } = require('../database/mongoDBRepository');
const { logError, logSuccess } = require('../utils');
const { getFromCache, setToCache } = require('../services/cacheService');


const getLeaguesByPaging = async (page, limit) => {
    const cacheKey = `leagues:${page}`;
    const cachedData = await getFromCache(cacheKey);

    if (cachedData) {
        ctx.body = cachedData;
    } else {
        const skip = (page - 1) * limit;
        const leagues = await db.find().skip(skip).limit(limit);

        await setToCache(cacheKey, JSON.stringify(leagues));

        return leagues;
    }
}

const addLeagues = (footballMatch) => {
    try {
        // Insert data into MongoDB
        const FootballMatch = db.model('FootballMatch', FootballMatchSchema);

        // Insert multiple records into the MongoDB collection
        FootballMatch.insertMany(footballMatch);

        logSuccess('Matches added successfully!')
    } catch (error) {
        logError('Error while inserting data to MongoDB:', error.message);
    }
}

module.exports = {
    getLeaguesByPaging,
    addLeagues
};
