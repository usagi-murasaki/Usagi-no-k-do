const { startServer, stopServer } = require('./server')

function wrapWithErrorLogger (fn) {
  return () => fn().catch((err) => {
    console.error(err)
  })
}

process.on('uncaughtException', (err) => {
  console.log('[UNKS] Process receive Uncaught Exception:')
  if (err.stack) {
    console.log(err.stack)
  } else {
    console.log(err)
  }
  wrapWithErrorLogger(() => stopServer(true))
})

process.on('SIGTERM', () => {
  console.log('[UNKS] Process receive SIGTERM')
  wrapWithErrorLogger(() => stopServer(true))
})

process.on('SIGINT', () => {
  console.log('[UNKS] Process receive SIGINT')
  wrapWithErrorLogger(() => stopServer(true))
})

wrapWithErrorLogger(() => startServer())()