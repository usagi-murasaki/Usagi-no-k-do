const router = require('express').Router()
const { auth, validate, handle} = require('./util')

const asyncMiddleware = fn => (...args) => { Promise.resolve(fn(...args)).catch(args[2]); };

router.post('/api/:token', asyncMiddleware(validate), asyncMiddleware(handle))

router.post('/login', asyncMiddleware(auth))
router.post('/fork', asyncMiddleware(auth))
router.post('/void', asyncMiddleware(auth))

module.exports = router