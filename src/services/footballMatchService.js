const { db, FootballMatchSchema, } = require('../database/mongoDBRepository');
const { logError, logSuccess, delay } = require('../utils');
const { getFromCache, setToCache } = require('./cacheService');
const mongoose = require('mongoose');


const getFootballMatchByPaging = async (page, limit) => {
    // const cacheKey = `footballMatch:${page}`;
    const cachedData = undefined// await getFromCache(cacheKey);
    if (cachedData) {
        return cachedData
    }
    const skip = (page - 1) * limit;

    const FootballMatch = mongoose.model('FootballMatch', FootballMatchSchema);
    const footballMatches = await FootballMatch.find()
        .select('-_id Date HomeTeam AwayTeam FTHG FTAG Referee')
        .skip(skip)
        .limit(limit)
        .exec()

    const totalDocuments = await FootballMatch.countDocuments();

    // await setToCache(cacheKey, JSON.stringify(footballMatches));

    return {
        totalCount: totalDocuments,
        data: footballMatches,
    };
}

const addFootballMatch = (footballMatch) => {
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
    getFootballMatchByPaging,
    addFootballMatch
};
