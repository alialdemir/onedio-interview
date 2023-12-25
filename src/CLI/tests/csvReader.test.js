const axios = require('axios');
const { expect } = require('chai');
const { readCSV } = require('../csvReader'); // Replace 'yourFileName' with the actual file name

describe('readCSV function', () => {
    // Mocking axios.get to simulate a successful CSV file retrieval
    beforeEach(() => {
        const csvData = 'Div,Date,HomeTeam\nE0,18/08/17,Bayern Munich\nD1,13/05/2018,Hamburg';
        axios.get = async () => ({ data: csvData });
    });

    it('should parse CSV and return JSON data', async () => {
        const csvURL = 'https://static.onedio.com/case-studies/1819-E0.csv';
        const jsonData = await readCSV(csvURL);

        expect(jsonData).to.deep.equal([
            { Div: 'E0', Date: '18/08/17', HomeTeam: 'Bayern Munich' },
            { Div: 'D1', Date: '13/05/2018', HomeTeam: 'Hamburg' },
        ]);
    });

    it('should handle errors and return an empty array on failure', async () => {
        const csvURL = 'https://static.onedio.com/nonexistent.csv';
        axios.get = async () => {
            throw new Error('Failed to fetch CSV');
        };

        const jsonData = await readCSV(csvURL);

        expect(jsonData).to.deep.equal([]);
    });
});
