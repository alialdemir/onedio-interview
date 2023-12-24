const axios = require('axios');
const Papa = require('papaparse');
const { logError } = require('../utils');

// Module to read CSV file and convert it to JSON format
const readCSV = async (csvURL) => {
    try {
        // Download the CSV file
        const response = await axios.get(csvURL);

        // Extract CSV content as a string
        const csvContent = response.data;

        // Parse and convert CSV to JSON
        const jsonData = await parseCSV(csvContent);

        return jsonData;
    } catch (error) {
        handleCSVError(error);
        return [];
    }
};

const parseCSV = (csvContent) => {
    return new Promise((resolve, reject) => {
        Papa.parse(csvContent, {
            header: true,
            complete: (result) => {
                const jsonData = result.data;
                resolve(jsonData);
            },
            error: (error) => {
                reject(error);
            },
        });
    });
};

const handleCSVError = (error) => {
    logError('An error occurred while fetching the CSV file:', error.message);
    logError('Error: CSV format is not correct.');
    logError('Error Details:', error.message);
};

module.exports = { readCSV };
