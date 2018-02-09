const env = require('./production')

const envSettings = {
  HTTPS: (env.https.toLowerCase() === 'true')?true:false,
  PORT: Number(env.port),
  HTTP_ERROR_CODE: Number(env.http_error_code),
  HTTP_ERROR_TEXT: env.http_error_text,
  BROKER_URI: 'ws://' + env.broker_url + ':' + env.broker_port
}

module.exports = function(prop) {
  return envSettings[prop]
}