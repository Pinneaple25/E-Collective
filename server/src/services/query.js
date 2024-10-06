const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_LIMIT = 20;
const MAXIMUN_LIMIT_PAGE = 100;

const getPagination = (query) => {
  const page = Math.abs(query.page) || DEFAULT_PAGE_NUMBER;
  let limit = Math.abs(query.limit) || DEFAULT_PAGE_LIMIT;
  limit = limit > MAXIMUN_LIMIT_PAGE ? MAXIMUN_LIMIT_PAGE : limit;
  const skip = (page - 1) * limit;

  return { skip, limit }
}

module.exports = {
  getPagination,
};