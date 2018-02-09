
module.exports = {
  https: process.env.HTTPS || 'false',
  port: process.env.PORT || 80,
  http_error_code: process.env.HTTP_ERROR_CODE || 202,
  http_error_text: process.env.HTTP_ERROR_TEXT || 'Accepted',
  mongo_url: process.env.MONGO_URL || 'mongo',
  mongo_port: process.env.MONGO_PORT || 27017,
  mongo_base: process.env.MONGODB_DATABASE || 'USAGI_NO_K_DO',
  mongo_login: process.env.MONGODB_USERNAME || null,
  mongo_pwd: process.env.MONGODB_PASSWORD || null,
  broker_url: process.env.BROKER_URL || 'broker',
  broker_port: process.env.BROKER_PORT || 1883
}