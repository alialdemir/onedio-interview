const { readCSV } = require('./csvReader');
const { insertDataToMongoDB } = require('../database/mongoDBRepository');

const readline = require('readline');
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
                resolve(csvURL);
            }
        });
    });
};

// Main function to execute the application
const main = async () => {
    while (true) {
        try {
            // Get CSV URL from the user
            const csvURL = await askForCSVURL();

            // Read CSV and convert to JSON
            const jsonData = await readCSV(csvURL);
            console.log(jsonData)
            // Insert JSON data into MongoDB
            await insertDataToMongoDB(jsonData);

        } catch (error) {
            console.error('An error occurred:', error?.message);
        }
    }
};

// Start the application
main();
module.exports = { main };
