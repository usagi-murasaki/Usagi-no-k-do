const settings = require('../settings')

async function validate(req, res, next) {
  if (await checkTokenParam(req)) {
    next()
  } else {
    await sendError(res)
  }
}

async function handle(req, res, next) {
  const req_id = uuid().split('-')[0]
  let result = {}
  result.id = req_id
  res.status(200).json(result)
}

async function auth(req, res, next) {
  const req_id = uuid().split('-')[0]
  let result = {}
  result.id = req_id
  res.status(200).json(result)
}

async function sendError(res, data) {
  if(data && data.id && data.message){
    log(null, data.message, 'error', data.id)
  }
  res.status(settings('HTTP_ERROR_CODE')).json({ message: settings('HTTP_ERROR_TEXT') })
}

async function checkTokenParam(req) {
  const token = req.path.split('/').filter(n => n)
  return true
}

module.exports = {
  validate,
  handle,
  auth,
  sendError
}