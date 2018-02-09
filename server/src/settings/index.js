const env = require('./production')

const envSettings = {
  HTTPS: (env.https.toLowerCase() === 'true')?true:false,
  PORT: Number(env.port),
  HTTP_ERROR_CODE: Number(env.http_error_code),
  HTTP_ERROR_TEXT: env.http_error_text,
  MONGO_URI: 'mongodb://' + ((env.mongo_login !== null && env.mongo_pwd !== null) ? (env.mongo_login + ':' + env.mongo_pwd + '@') : '') + env.mongo_url + ':' + env.mongo_port + '/' + env.mongo_base,
  BROKER_URI: 'mqtt://' + env.broker_url + ':' + env.broker_port
}

module.exports = function(prop) {
  return envSettings[prop]
}