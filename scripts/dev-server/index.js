const { createServer } = require('https')
const { parse } = require('url')
const fs = require('fs')
const path = require('path')
const next = require('next')

const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const cert = fs.readFileSync(path.join(__dirname, '/certificates/localhost.crt'))
  const key = fs.readFileSync(path.join(__dirname, '/certificates/localhost.key'))

  createServer({ cert, key }, (req, res) => {
    const parsedUrl = parse(req.url, true)
    handle(req, res, parsedUrl)
  }).listen(port, () => {
    console.log(`> Ready on https://localhost:${port}`)
    if (dev) require('opener')(`https://localhost:${port}`)
  })
})
