const fs = require('node:fs')
const path = require('node:path')
const sizeOf = require('image-size')

const publicPath = path.join(__dirname, '../public')

const output = {}

function readRecursively(directory) {
  const dirents = fs.readdirSync(directory, { withFileTypes: true })

  for (const dirent of dirents) {
    const item = path.join(directory, dirent.name)
    if (dirent.isDirectory()) {
      readRecursively(item)
    } else if (/.(bmp|cur|dds|gif|icns|ico|jpg|jpeg|ktx|png|pnm|pam|pbm|pfm|pgm|ppm|psd|svg|tiff|webp)$/iu.test(item)) {
      const size = sizeOf(item)
      output[item.replace(publicPath, '').replace(/\\/gu, '/')] = { width: size.width, height: size.height }
    }
  }

  fs.mkdirSync(path.join(__dirname, '../.generated/'), { recursive: true })
  fs.writeFileSync(
    path.join(__dirname, '../.generated/public-image-sizes.ts'),
    `export const publicImageSizes = ${JSON.stringify(output, undefined, 2)}\n`
  )
}

console.log('[SCRIPTS] Generating .generated/public-image-sizes.json')

readRecursively(publicPath)
