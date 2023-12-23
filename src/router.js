const { getFootballMatches } = require('./controllers/footballMatchController');
const Router = require('koa-router');
const fs = require('fs')

const swaggerSpec = fs.readFileSync(`${__dirname}/../swagger.yaml`)

const router = Router();

router
    .get('/footballMatches', getFootballMatches)

router.get('/swagger.yaml',
    (ctx, _next) => {
        ctx.status = 200
        ctx.body = swaggerSpec.toString()
    })

module.exports = router;