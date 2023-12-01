const path = require('node:path')
const chokidar = require('chokidar')

const assetsDir = path.join(__dirname, '../src/assets/')
const svgsDir = path.join(__dirname, '../src/svgs/')
const generate = require('./imports-generate').default

chokidar.watch([assetsDir, svgsDir], { ignoreInitial: true }).on('all', () => {
  generate()
})
