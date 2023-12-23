const { getLeaguesByPaging } = require('../services/leaguesService');

const getLeagues = async (ctx) => {
  const page = parseInt(ctx.query.page) || 1;
  const limit = parseInt(ctx.query.limit) || 10;

  ctx.body = await getLeaguesByPaging(page, limit);
}

module.exports = {
  getLeagues,
};
