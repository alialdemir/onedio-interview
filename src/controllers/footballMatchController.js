const { getFootballMatchByPaging } = require('../services/footballMatchService');


const getFootballMatches = async (ctx) => {
  const page = parseInt(ctx.query.page) || 1;
  const limit = parseInt(ctx.query.limit) || 15;

  const division = ctx.query.Division || 'All';

  const startYear = new Date(ctx.query.startYear);
  const endYear = new Date(ctx.query.endYear);

  const footballMatches = await getFootballMatchByPaging(page, limit, startYear, endYear, division)

  ctx.body = {
    page,
    limit,
    ...footballMatches
  }
}

module.exports = {
  getFootballMatches,
};
