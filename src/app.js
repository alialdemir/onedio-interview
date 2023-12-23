// app.js

const Koa = require('koa');
const bodyParserMiddleware = require('./middlewares/bodyParserMiddleware');
const router = require('./router');

// Load environment variables from .env file
const dotenv = require('dotenv');
dotenv.config();

// Create a new Koa application
const app = new Koa();

// Use the bodyParser middleware to parse request bodies
app.use(bodyParserMiddleware);

// Add routes to the Koa application
app.use(router.routes());
app.use(router.allowedMethods());

// Listen for incoming requests on the specified port or use the default port 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
