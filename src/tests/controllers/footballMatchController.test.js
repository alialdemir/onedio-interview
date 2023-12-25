const { expect } = require('chai');
const sinon = require('sinon');
const { getFootballMatches } = require('../../controllers/footballMatchController');
const footballMatchService = require('../../services/footballMatchService');

describe('getFootballMatches', () => {
    it('should call getFootballMatchByPaging with default values if no query parameters are provided', async () => {
        const ctx = {
            query: {},
        };

        const getFootballMatchByPagingStub = sinon.stub(footballMatchService, 'getFootballMatchByPaging').resolves([]);

        await getFootballMatches(ctx);

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
            "totalCount": 527,
            "data": [{
                "Date": "2018-08-10T00:00:00.000Z",
                "HomeTeam": "Man United",
                "AwayTeam": "Leicester",
                "FTHG": "2",
                "FTAG": "1",
                "Referee": "A Marriner"
            },
            {
                "Date": "2018-08-11T00:00:00.000Z",
                "HomeTeam": "Bournemouth",
                "AwayTeam": "Cardiff",
                "FTHG": "2",
                "FTAG": "0",
                "Referee": "K Friend"
            },
            {
                "Date": "2018-08-11T00:00:00.000Z",
                "HomeTeam": "Fulham",
                "AwayTeam": "Crystal Palace",
                "FTHG": "0",
                "FTAG": "2",
                "Referee": "M Dean"
            },
            {
                "Date": "2018-08-11T00:00:00.000Z",
                "HomeTeam": "Huddersfield",
                "AwayTeam": "Chelsea",
                "FTHG": "0",
                "FTAG": "3",
                "Referee": "C Kavanagh"
            },
            {
                "Date": "2018-08-11T00:00:00.000Z",
                "HomeTeam": "Newcastle",
                "AwayTeam": "Tottenham",
                "FTHG": "1",
                "FTAG": "2",
                "Referee": "M Atkinson"
            },
            {
                "Date": "2018-08-11T00:00:00.000Z",
                "HomeTeam": "Watford",
                "AwayTeam": "Brighton",
                "FTHG": "2",
                "FTAG": "0",
                "Referee": "J Moss"
            },
            {
                "Date": "2018-08-11T00:00:00.000Z",
                "HomeTeam": "Wolves",
                "AwayTeam": "Everton",
                "FTHG": "2",
                "FTAG": "2",
                "Referee": "C Pawson"
            },
            {
                "Date": "2018-08-12T00:00:00.000Z",
                "HomeTeam": "Arsenal",
                "AwayTeam": "Man City",
                "FTHG": "0",
                "FTAG": "2",
                "Referee": "M Oliver"
            },
            {
                "Date": "2018-08-12T00:00:00.000Z",
                "HomeTeam": "Liverpool",
                "AwayTeam": "West Ham",
                "FTHG": "4",
                "FTAG": "0",
                "Referee": "A Taylor"
            },
            {
                "Date": "2018-08-12T00:00:00.000Z",
                "HomeTeam": "Southampton",
                "AwayTeam": "Burnley",
                "FTHG": "0",
                "FTAG": "0",
                "Referee": "G Scott"
            },
            {
                "Date": "2018-08-18T00:00:00.000Z",
                "HomeTeam": "Cardiff",
                "AwayTeam": "Newcastle",
                "FTHG": "0",
                "FTAG": "0",
                "Referee": "C Pawson"
            },
            {
                "Date": "2018-08-18T00:00:00.000Z",
                "HomeTeam": "Chelsea",
                "AwayTeam": "Arsenal",
                "FTHG": "3",
                "FTAG": "2",
                "Referee": "M Atkinson"
            },
            {
                "Date": "2018-08-18T00:00:00.000Z",
                "HomeTeam": "Everton",
                "AwayTeam": "Southampton",
                "FTHG": "2",
                "FTAG": "1",
                "Referee": "L Mason"
            },
            {
                "Date": "2018-08-18T00:00:00.000Z",
                "HomeTeam": "Leicester",
                "AwayTeam": "Wolves",
                "FTHG": "2",
                "FTAG": "0",
                "Referee": "M Dean"
            },
            {
                "Date": "2018-08-18T00:00:00.000Z",
                "HomeTeam": "Tottenham",
                "AwayTeam": "Fulham",
                "FTHG": "3",
                "FTAG": "1",
                "Referee": "A Taylor"
            }]
        };
        sinon.stub(footballMatchService, 'getFootballMatchByPaging').resolves(fakeFootballMatches);

        await getFootballMatches(ctx);

        expect(ctx.body).to.deep.equal(fakeFootballMatches);
    });
});
