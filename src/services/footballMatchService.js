const { db } = require('../database/mongoDBRepository');
const FootballMatchSchema = require('../database/schemas/footballMatchSchema');
const { logError, logSuccess, delay } = require('../utils');
const { getFromCache, setToCache } = require('./cacheService');
const mongoose = require('mongoose');

const leagues = {
    'All': 'All',
    'Premier League': 'E0',
    'Bundesliga': 'D1'
}

const getFootballMatchByPaging = async (page, limit, startYear, endYear, division) => {
    division = leagues[division];
    if (typeof division === 'undefined') {
        return {
            message: 'Invalid division field'
        };
    }

    const cacheKey = buildCacheKey(page, limit, startYear, endYear, division);
    const cachedData = await getFromCache(cacheKey);

    if (cachedData) {
        return cachedData;

    }
    const startDate = new Date(startYear);
    const endDate = new Date(endYear);

    const query = buildQuery(startDate, endDate, division);

    const FootballMatch = mongoose.model('FootballMatch', FootballMatchSchema);
    const [footballMatches, totalDocuments] = await Promise.all([
        FootballMatch.find(query)
            .select('-_id Date HomeTeam AwayTeam FTHG FTAG Referee')
            .skip((page - 1) * limit)
            .limit(limit)
            .exec(),
        FootballMatch.countDocuments(query),
    ]);

    const result = {
        page,
        limit,
        totalCount: totalDocuments,
        data: footballMatches,
    };

    await setToCache(cacheKey, JSON.stringify(result));

    return result;
};

const buildCacheKey = (page, limit, startYear, endYear, division) => {
    return `footballMatch:${page}:${limit}:${startYear}:${endYear}:${division}`;
};

const buildQuery = (startDate, endDate, division) => {
    const query = {
        Date: {
            $gte: startDate,
            $lte: endDate,
        },
    };

    if (division !== 'All') {
        query.Div = division;
    }

    return query;
};

const addFootballMatch = (matches) => {
    try {
        // Insert data into MongoDB
        const FootballMatch = db.model('FootballMatch', FootballMatchSchema);

        const formattedMatches = matches.map(formatMatchDate);

        // Insert multiple records into the MongoDB collection
        FootballMatch.insertMany(formattedMatches);

        logSuccess('Matches added successfully!')
    } catch (error) {
        logError('Error while inserting data to MongoDB:', error.message);
    }
}


const formatMatchDate = (match) => {
    try {
        if (match.Date) {
            let [day, month, year] = match.Date.split('/');

            // These date formats are special case for 20/08/17
            if (year.length === 2) {
                year = `20${year}`;
            }

            const formattedDate = `${year}-${month}-${day}`;
            match.Date = new Date(formattedDate);
        }
    } catch (error) {
        // Handle the error if needed
    }

    return match;
};

module.exports = {
    getFootballMatchByPaging,
    addFootballMatch,
    buildCacheKey,
    buildQuery,
    formatMatchDate
};
