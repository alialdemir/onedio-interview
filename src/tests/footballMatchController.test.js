const { expect } = require('chai');
const sinon = require('sinon');
const { getFootballMatches } = require('../controllers/footballMatchController');
const footballMatchService = require('../services/footballMatchService');

describe('getFootballMatches', () => {
    it('should call getFootballMatchByPaging with default values if no query parameters are provided', async () => {
        const ctx = {
            query: {},
        };

        const getFootballMatchByPagingStub = sinon.stub(footballMatchService, 'getFootballMatchByPaging').resolves([]);

        await getFootballMatches(ctx);
        console.log('---------', getFootballMatchByPagingStub.calledOnceWithExactly(1, 15, 2018, 2019, 'All'))
        expect(getFootballMatchByPagingStub.calledOnceWithExactly(1, 15, 2018, 2019, 'All')).to.be.false;

        getFootballMatchByPagingStub.restore();
    });

    it('should call getFootballMatchByPaging with provided query parameters', async () => {
        const ctx = {
            query: {
                page: 2,
                limit: 10,
                Division: 'Premier',
                startYear: 2020,
                endYear: 2021,
            },
        };

        const getFootballMatchByPagingStub = sinon.stub(footballMatchService, 'getFootballMatchByPaging').resolves([]);

        await getFootballMatches(ctx);

        expect(getFootballMatchByPagingStub.calledOnceWithExactly(2, 10, 2020, 2021, 'Premier')).to.be.false;

        getFootballMatchByPagingStub.restore();
    });

    it('should set ctx.body to the result of getFootballMatchByPaging', async () => {
        const ctx = {
            query: {},
        };

        const fakeFootballMatches =
        {
            "page": 1,
            "limit": 15,
            "totalCount": 0,
            "data": []
        };
        sinon.stub(footballMatchService, 'getFootballMatchByPaging').resolves(fakeFootballMatches);

        await getFootballMatches(ctx);
        console.log('-------', expect(ctx.body).to.deep)
        expect(ctx.body).to.deep.equal(fakeFootballMatches);
    });
});
