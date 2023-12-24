const { expect } = require('chai');
const mongoose = require('mongoose');
const FootballMatchSchema = require('../../database/schemas/footballMatchSchema');

describe('FootballMatchSchema', () => {
    it('should create a valid FootballMatch document', async () => {
        const FootballMatch = mongoose.model('FootballMatch', FootballMatchSchema);

        // Create a sample document
        const sampleData = {
            Div: 'EPL',
            Date: new Date(),
            HomeTeam: 'HomeTeam',
            AwayTeam: 'AwayTeam',
        };

        // Save the document to the in-memory database
        const savedDocument = await new FootballMatch(sampleData).save();

        // Fetch the saved document from the database
        const retrievedDocument = await FootballMatch.findOne({ _id: savedDocument._id });

        // Assertions
        expect(retrievedDocument).to.exist;
        expect(retrievedDocument.Div).to.equal(sampleData.Div);
        expect(retrievedDocument.Date).to.eql(sampleData.Date);
        expect(retrievedDocument.HomeTeam).to.equal(sampleData.HomeTeam);
        expect(retrievedDocument.AwayTeam).to.equal(sampleData.AwayTeam);
    });
});
