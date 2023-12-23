const axios = require('axios');
const Papa = require('papaparse');
const { logError } = require('../utils');

// Module to read CSV file and convert it to JSON format
const readCSV = (csvURL) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Download the CSV file
            const response = await axios.get(csvURL);

            // Extract CSV content as a string
            const csvContent = response.data;

            // Parse and convert CSV to JSON
            Papa.parse(csvContent, {
                header: true,
                complete: (result) => {
                    const jsonData = result.data;
                    return resolve(jsonData);
                },
                error: (error) => {
                    logError('Error: CSV format is not correct.');
                    logError('Error Details:', error.message);
                    return reject([]);
                },
            });
        } catch (error) {
            logError('An error occurred while fetching the CSV file:', error.message);
            return reject([]);

        }
    });

};

module.exports = { readCSV };

