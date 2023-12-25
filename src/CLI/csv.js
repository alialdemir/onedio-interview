const { readCSV } = require('./csvReader');
const { addFootballMatch } = require('../services/footballMatchService');
const readline = require('readline');
const { logError } = require('../utils');
const url = require('url');

// Function to get CSV URL from the user
const askForCSVURL = () => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve, rejects) => {
        rl.question('Please enter the CSV link (press "q" to exit): ', (csvURL) => {
            rl.close();

            if (csvURL.toLowerCase() === 'q') {
                console.log('Exiting...');
                rejects();
                process.exit(0);
            } else {
                if (!isValidCSVURL(csvURL)) {
                    return rejects();
                }

                resolve(csvURL);
            }
        });
    });
};

const isValidCSVURL = (csvURL) => {
    try {
        const parsedURL = new URL(csvURL);

        // The protocol part of the URL should be 'http' or 'https'
        if (parsedURL.protocol !== 'http:' && parsedURL.protocol !== 'https:') {
            logError('Invalid protocol. CSV link should start with "http" or "https".');
            return false;
        } else if (!csvURL.endsWith('.csv')) {
            return false;
        }

        return true;
    } catch (error) {
        logError('Invalid CSV URL format..');
        return false;
    }
};

// Main function to execute the application
const main = async () => {
    // while (true) {
    try {
        // Get CSV URL from the user
        const csvURL = await askForCSVURL();

        // Read CSV and convert to JSON
        const jsonData = await readCSV(csvURL);

        // Insert JSON data into MongoDB
        await addFootballMatch(jsonData);

    } catch (error) {
        logError(error?.message || '');
    }
    // }
};

// Start the application
main();

module.exports = {
    main,
    askForCSVURL,
    isValidCSVURL
};
