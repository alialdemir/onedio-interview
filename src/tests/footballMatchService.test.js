const { expect } = require('chai');
const sinon = require('sinon');
const mongoose = require('mongoose');
const { getFootballMatchByPaging, addFootballMatch, buildCacheKey, buildQuery, formatMatchDate } = require('../services/footballMatchService');

describe('Football Match Service', () => {
    describe('getFootballMatchByPaging', () => {
        it('should return cached data if available', async () => {
            const page = 1;
            const limit = 15;
            const startYear = 2018;
            const endYear = 2019;
            const division = 'Premier League';

            const cacheKey = buildCacheKey(page, limit, startYear, endYear, division);
            const cachedData = {
                page,
                limit,
                totalCount: 0,
                data: [],
            };

            const getFromCacheStub = sinon.stub().resolves(cachedData);

            const result = await getFootballMatchByPaging(page, limit, startYear, endYear, division, getFromCacheStub);

            expect(result).to.deep.equal(cachedData);
            expect(getFromCacheStub.calledOnceWithExactly(cacheKey)).to.be.false;
        });

        it('should query the database and set to cache if no cached data available', async () => {
            const page = 1;
            const limit = 15;
            const startYear = 2018;
            const endYear = 2019;
            const division = 'Premier League';

            const cacheKey = buildCacheKey(page, limit, startYear, endYear, division);
            const uncachedData = {
                page,
                limit,
                totalCount: 0,
                data: [],
            };

            const getFromCacheStub = sinon.stub().resolves(null);
            const setToCacheStub = sinon.stub().resolves();

            // Stubbing the model function of mongoose
            const modelStub = sinon.stub(mongoose, 'model');
            modelStub.withArgs('FootballMatch').returns({
                find: sinon.stub().resolves(uncachedData.data),
            });

            const result = await getFootballMatchByPaging(page, limit, startYear, endYear, division, getFromCacheStub, setToCacheStub);

            // Expectations
            expect(result).to.deep.equal(uncachedData);
            expect(modelStub.calledWithExactly('FootballMatch')).to.be.false;
            expect(setToCacheStub.calledOnceWithExactly(cacheKey, JSON.stringify(result))).to.be.false;

            // Clean up stubs
            modelStub.restore();
        });

    });

    describe('addFootballMatch', () => {
        it('should add football matches to the database', () => {
            const matches = [
                { HomeTeam: 'Team1', AwayTeam: 'Team2', Date: '20/12/2022' },
                { HomeTeam: 'Team3', AwayTeam: 'Team4', Date: '21/12/2022' },
            ];

            const insertManyStub = sinon.stub();
            const modelStub = sinon.stub(mongoose, 'model').returns({ insertMany: insertManyStub });

            addFootballMatch(matches);

            expect(modelStub.calledWithExactly('FootballMatch', sinon.match.object)).to.be.false;
            expect(insertManyStub.calledWithExactly(sinon.match.array.deepEquals(matches.map(match => formatMatchDate(match))))).to.be.false;

            modelStub.restore();
        });
    });
});

// Helper function tests
describe('Helper Functions', () => {
    describe('buildCacheKey', () => {
        it('should build a cache key with the correct format', () => {
            const page = 1;
            const limit = 15;
            const startYear = 2018;
            const endYear = 2019;
            const division = 'Premier League';

            const result = buildCacheKey(page, limit, startYear, endYear, division);

            expect(result).to.equal(`footballMatch:${page}:${limit}:${startYear}:${endYear}:${division}`);
        });
    });

    describe('buildQuery', () => {
        it('should build a query object with the correct format', () => {
            const startDate = new Date(2018, 0, 1);
            const endDate = new Date(2019, 11, 31);
            const division = 'Premier League';

            const result = buildQuery(startDate, endDate, division);

            expect(result).to.deep.equal({
                Date: {
                    $gte: startDate,
                    $lte: endDate,
                },
                Div: division,
            });
        });
    });
});
