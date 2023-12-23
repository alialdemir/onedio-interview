// app.js

const Koa = require('koa');
const router = require('./router');
const { koaSwagger } = require('koa2-swagger-ui');
const cors = require('kcors')
const bodyParser = require('koa-bodyparser');
const json = require('koa-json')

// Load environment variables from .env file
const dotenv = require('dotenv');
dotenv.config();

// Create a new Koa application
const app = new Koa()
    // Global exception handler
    .use(async (ctx, next) => {
        try {
            await next();
        } catch (err) {
            // will only respond with JSON
            ctx.status = err.statusCode || err.status || 500;
            ctx.body = {
                message: err.message
            };
        }
    })
    .use(json())
    .use(cors())
    .use(
        koaSwagger({
            routePrefix: '/swagger',
            swaggerOptions: {
                url: '/swagger.yaml',
            },
        }),
    )

    // Use the bodyParser middleware to parse request bodies
    .use(bodyParser())



// Add routes to the Koa application
app.use(router.routes())
app.use(router.allowedMethods());


// Listen for incoming requests on the specified port or use the default port 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
