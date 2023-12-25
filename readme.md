# Onedio Koa.js MongoDB Redis Swagger Project

This project includes a simple web application created using Koa.js. The application involves data retrieval from MongoDB, caching mechanism using Redis, and an API documented with Swagger.

## Getting Started

Initiate the project by following the steps below.

### Installation

1. In the terminal or command prompt, type the following command to install project dependencies:

   ```bash
   npm install

   ```

2. Start MongoDB and Redis servers using Docker Compose:

   ```bash
   docker-compose up -d
   ```

3. Use the following command to start the application:

   ```bash
   npm start
   ```

The application will run by default at `http://localhost:3000`.

### CLI Usage

1. Use the following command to input CSV via the CLI:

   ```bash
   npm run cli
   ```

2. Use the following CSV links as sample data:

   ```bash
   Data Source:
   • Premier League
        a. 2018-2019: https://static.onedio.com/case-studies/1819-E0.csv
        b. 2017-2018: https://static.onedio.com/case-studies/1718-E0.csv

   • Bundesliga
        a. 2018-2019: https://static.onedio.com/case-studies/1819-D1.csv
        b. 2017-2018: https://static.onedio.com/case-studies/1718-D1.csv
   ```

### Tests Execution

After successfully installing the project, you can run tests with the following command:

```bash
npm test
```
