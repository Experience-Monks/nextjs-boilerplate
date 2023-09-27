const fs = require('fs')
const path = require('path')

const assetsDir = path.join(__dirname, '../src/assets/')

/* eslint-disable sonarjs/cognitive-complexity */
function readRecursively(directory, base, regex, appendDefault = false, lines = '') {
  if (fs.existsSync(directory)) {
    const dirents = fs.readdirSync(directory, { withFileTypes: true })
    for (const dirent of dirents) {
      const item = path.join(directory, dirent.name)
      if (dirent.isDirectory()) {
        lines = readRecursively(item, base, regex, appendDefault, lines)
      } else {
        if (regex.test(item)) {
          const p = item.replace(base, '@/assets/')
          lines += `  '${p}': require('${p}')${appendDefault ? '.default' : ''},\n`
        }
      }
    }
  }
  return lines
} /* eslint-enable sonarjs/cognitive-complexity */

function generateImportsFile(file, regex, prefix, suffix, appendDefault = false) {
  let output = prefix
  output += readRecursively(assetsDir, assetsDir, regex, appendDefault, '')
  output += suffix
  fs.mkdirSync(path.join(__dirname, '../.generated'), { recursive: true })
  fs.writeFileSync(path.join(__dirname, '../.generated/' + file), output)
  console.log('.generated/' + file + ' written.')
}

function run() {
  generateImportsFile(
    'asset-imports.ts',
    /.(mp3|mp4|glb|gltf|fbx|bin|hdr|exr|webm|webp|riv)$/i,
    'export default {\n',
    '} as { [key: string]: string }\n'
  )

  generateImportsFile(
    'image-imports.ts',
    /.(jpg|jpeg|png|webp)$/i,
    "import { StaticImageData } from 'next/image'\n\nexport default {\n",
    '} as { [key: string]: StaticImageData }\n',
    true
  )
}

module.exports = {
  default: run
}
