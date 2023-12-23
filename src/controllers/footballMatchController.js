const { getFootballMatchByPaging } = require('../services/footballMatchService');


const getFootballMatches = async (ctx) => {
  const page = parseInt(ctx.query.page) || 1;
  const limit = parseInt(ctx.query.limit) || 10;

  const footballMatches = await getFootballMatchByPaging(page, limit)

  ctx.body = {
    page,
    limit,
    ...footballMatches
  }
}

module.exports = {
  getFootballMatches,
};
