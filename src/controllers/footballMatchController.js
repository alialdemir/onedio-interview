const { getFootballMatchByPaging } = require('../services/footballMatchService');


const getFootballMatches = async (ctx) => {
  const page = parseInt(ctx.query.page) || 1;
  const limit = parseInt(ctx.query.limit) || 15;

  const division = ctx.query.Division || 'All';

  const startYear = ctx.query.startYear || 2018
  const endYear = ctx.query.endYear || 2019

  const footballMatches = await getFootballMatchByPaging(page, limit, startYear, endYear, division)

  ctx.body = footballMatches

}

module.exports = {
  getFootballMatches,
};
