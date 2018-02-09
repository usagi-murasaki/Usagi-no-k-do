const router = require('express').Router()

const asyncMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
  };

router.get('/', asyncMiddleware(async (req, res, next) => {
  res.json({ "status":0 });
}));

module.exports = router