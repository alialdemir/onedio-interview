// const mongoose = require('mongoose');
// const { insertDataToMongoDB, FootballMatchSchema } = require('./mongoDBRepository');
// const { delay } = require('../utils')
// const assert = require('assert');

// const mongoURL = 'mongodb://root:onedio@localhost:27017';


// before(async function () {
//     // Connect to MongoDB
//     await mongoose.connect(mongoURL, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     });
//     const FootballMatch = mongoose.model('FootballMatch', FootballMatchSchema);
//     FootballMatch.collection.drop();
// });

// after(async function () {
//     // Close the MongoDB connection
//     await mongoose.connection.close();
// });

// describe('MongoDB Connection', function () {
//     it('should connect to MongoDB successfully', function () {
//         assert.strictEqual(mongoose.connection.readyState, 2, 'MongoDB connection failed');
//     });
// });

// describe('Insert Data to MongoDB', function () {
//     it('should insert data into MongoDB', async function () {
//         // The test data
// const testData = [
//     {
//         Div: 'E0',
//         Date: '29/10/2018',
//         HomeTeam: 'Tottenham',
//         AwayTeam: 'Man City',
//         FTHG: '0',
//         FTAG: '1',
//         FTR: 'A',
//         HTHG: '0',
//         HTAG: '1',
//         HTR: 'A',
//         Referee: 'K Friend',
//         HS: '4',
//         AS: '13',
//         HST: '1',
//         AST: '6',
//         HF: '13',
//         AF: '13',
//         HC: '3',
//         AC: '6',
//         HY: '2',
//         AY: '2',
//         HR: '0',
//         AR: '0',
//         B365H: '4.75',
//         B365D: '4.1',
//         B365A: '1.75',
//         BWH: '4.33',
//         BWD: '4.1',
//         BWA: '1.75',
//         IWH: '4.3',
//         IWD: '3.8',
//         IWA: '1.8',
//         PSH: '4.76',
//         PSD: '4.24',
//         PSA: '1.74',
//         WHH: '4.4',
//         WHD: '4.2',
//         WHA: '1.73',
//         VCH: '4.8',
//         VCD: '4.1',
//         VCA: '1.73',
//         Bb1X2: '38',
//         BbMxH: '4.8',
//         BbAvH: '4.51',
//         BbMxD: '4.35',
//         BbAvD: '4.1',
//         BbMxA: '1.8',
//         BbAvA: '1.72',
//         BbOU: '32',
//         'BbMx>2.5': '1.62',
//         'BbAv>2.5': '1.58',
//         'BbMx<2.5': '2.55',
//         'BbAv<2.5': '2.36',
//         BbAH: '19',
//         BbAHh: '1',
//         BbMxAHH: '1.75',
//         BbAvAHH: '1.68',
//         BbMxAHA: '2.35',
//         BbAvAHA: '2.24',
//         PSCH: '5.42',
//         PSCD: '4.29',
//         PSCA: '1.66'
//     }
// ];

//         // Insert test data into MongoDB
//         await insertDataToMongoDB(testData);

//         // Check the number of saved records in the database
//         const FootballMatch = mongoose.model('FootballMatch', FootballMatchSchema);

//         await delay(1000);

//         const count = await FootballMatch.countDocuments({});
//         assert.strictEqual(count, testData.length, 'Data insertion failed');
//     });
// });
