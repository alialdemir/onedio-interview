// app.js

const Koa = require('koa');
const Router = require('koa-router');
const dotenv = require('dotenv');
const bodyParserMiddleware = require('./middlewares/bodyParserMiddleware');
const leaguesController = require('./controllers/leaguesController');

// Load environment variables from .env file
dotenv.config();

// Create a new Koa application
const app = new Koa();
const router = new Router();


// Use the bodyParser middleware to parse request bodies
app.use(bodyParserMiddleware);

// Define Koa routes
router.get('/leagues', leaguesController.getLeagues);

// Add routes to the Koa application
app.use(router.routes());
app.use(router.allowedMethods());

// Listen for incoming requests on the specified port or use the default port 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
