const leaguesController = require('./controllers/leaguesController');
const swaggerUi = require('swagger-ui-koa')

const Router = require('koa-router');
const router = Router();

router
    .get('/leagues', leaguesController.getLeagues)


module.exports = router;