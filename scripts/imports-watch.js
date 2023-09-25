const chokidar = require('chokidar')
const path = require('path')

const assetsDir = path.join(__dirname, '../src/assets/')
const generate = require('./imports-generate').default

chokidar.watch(assetsDir, { ignoreInitial: true }).on('all', () => {
  generate()
})
