const { startServer, stopServer } = require('./server')

function wrapWithErrorLogger (fn) {
  return () => fn().catch((err) => {
    console.error(err)
  })
}

process.on('uncaughtException', (err) => {
  console.log('[UNKP] Process receive Uncaught Exception:')
  if (err.stack) {
    console.log(err.stack)
  } else {
    console.log(err)
  }
  wrapWithErrorLogger(() => stopServer(true))
})

process.on('SIGTERM', () => {
  console.log('[UNKP] Process receive SIGTERM')
  wrapWithErrorLogger(() => stopServer(true))
})

process.on('SIGINT', () => {
  console.log('[UNKP] Process receive SIGINT')
  wrapWithErrorLogger(() => stopServer(true))
})

wrapWithErrorLogger(() => startServer())()