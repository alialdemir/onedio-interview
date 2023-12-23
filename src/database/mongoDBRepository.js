const mongoose = require('mongoose');

// Load environment variables from .env file
const dotenv = require('dotenv');
dotenv.config();

// MongoDB connection URI
const mongoDbURL = process.env.MONGODB_URL;

// Create Mongoose connection
mongoose.connect(mongoDbURL);

// Check the database connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('\nConnected to MongoDB');
});

// Schema definition
// Define the schema based on the provided JSON data
const FootballMatchSchema = new mongoose.Schema({
    Div: String,
    Date: String,
    HomeTeam: String,
    AwayTeam: String,
    FTHG: String,
    FTAG: String,
    FTR: String,
    HTHG: String,
    HTAG: String,
    HTR: String,
    Referee: String,
    HS: String,
    AS: String,
    HST: String,
    AST: String,
    HF: String,
    AF: String,
    HC: String,
    AC: String,
    HY: String,
    AY: String,
    HR: String,
    AR: String,
    B365H: String,
    B365D: String,
    B365A: String,
    BWH: String,
    BWD: String,
    BWA: String,
    IWH: String,
    IWD: String,
    IWA: String,
    PSH: String,
    PSD: String,
    PSA: String,
    WHH: String,
    WHD: String,
    WHA: String,
    VCH: String,
    VCD: String,
    VCA: String,
    Bb1X2: String,
    BbMxH: String,
    BbAvH: String,
    BbMxD: String,
    BbAvD: String,
    BbMxA: String,
    BbAvA: String,
    BbOU: String,
    'BbMx>2.5': String,
    'BbAv>2.5': String,
    'BbMx<2.5': String,
    'BbAv<2.5': String,
    BbAH: String,
    BbAHh: String,
    BbMxAHH: String,
    BbAvAHH: String,
    BbMxAHA: String,
    BbAvAHA: String,
    PSCH: String,
    PSCD: String,
    PSCA: String,
}, { collection: 'footballMatch' });

// const FootballMatch = mongoose.model('FootballMatch', FootballMatchSchema);

module.exports = {
    FootballMatchSchema,
    // FootballMatch,
    db
};
