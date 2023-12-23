const { db } = require('../database/mongoDBRepository');
const FootballMatchSchema = require('../database/schemas/footballMatchSchema');
const { logError, logSuccess, delay } = require('../utils');
const { getFromCache, setToCache } = require('./cacheService');
const mongoose = require('mongoose');

const leagues = {
    'Premier League': 'E0',
    'Bundesliga': 'D1'
}

const getFootballMatchByPaging = async (page, limit, startDate, endDate, division) => {
    // const cacheKey = `footballMatch:${page}`;
    const cachedData = undefined// await getFromCache(cacheKey);
    if (cachedData) {
        return cachedData
    }

    const query = {
        Date: {
            $gte: startDate,
            $lte: endDate,
        },
        Div: 'E0'
    }

    if (division !== 'All') {
        query.Div = leagues[division]
    }

    console.log('div', query)
    const skip = (page - 1) * limit;

    const FootballMatch = mongoose.model('FootballMatch', FootballMatchSchema);
    const footballMatches = await FootballMatch
        .find(query)
        .select('-_id Date HomeTeam AwayTeam FTHG FTAG Referee')
        .skip(skip)
        .limit(limit)
        .exec()

    const totalDocuments = await FootballMatch.countDocuments(query);
    // console.log(footballMatches)
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
        footballMatch = footballMatch.map(match => {
            if (match.Date) {
                try {
                    let [day, month, year] = match.Date.split('/');

                    // These date formats are special case for 20/08/17
                    if (year.toString().length === 2) {
                        year += 2000
                    }

                    const formattedDate = `${year}-${month}-${day}`;

                    match.Date = new Date(formattedDate)
                } catch (error) {
                }
            }

            return match
        })

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
