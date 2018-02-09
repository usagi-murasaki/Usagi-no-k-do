
module.exports = {
  https: process.env.HTTPS || 'false',
  port: process.env.PORT || 80,
  http_error_code: process.env.HTTP_ERROR_CODE || 202,
  http_error_text: process.env.HTTP_ERROR_TEXT || 'Accepted',
  broker_url: process.env.BROKER_URL || 'broker',
  broker_port: process.env.BROKER_PORT || 9001 
}