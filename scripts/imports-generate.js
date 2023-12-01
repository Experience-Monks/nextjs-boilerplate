const fs = require('node:fs')
const path = require('node:path')

const srcPath = path.join(__dirname, '../src/')
const assetsDir = path.join(srcPath, '/assets/')
const svgsDir = path.join(srcPath, '/svgs/')

function readRecursively(directory, base, regex, appendDefault = false, filenameKey = false, lines = '') {
  let l = lines
  if (fs.existsSync(directory)) {
    const dirents = fs.readdirSync(directory, { withFileTypes: true })
    for (const dirent of dirents) {
      const item = path.join(directory, dirent.name)
      if (dirent.isDirectory()) {
        l = readRecursively(item, base, regex, appendDefault, filenameKey, l)
      } else if (regex.test(item)) {
        const k = filenameKey ? item.replace(base, '').replace(/\.[^/.]+$/iu, '') : item.replace(base, '@/assets/')
        const p = item.replace(srcPath, '@/')
        l += `  '${k}': require('${p}')${appendDefault ? '.default' : ''},\n`
      }
    }
  }
  return l
}

function generateImportsFile(dir, file, regex, prefix, suffix, appendDefault = false, filenameKey = false) {
  let output = prefix
  output += readRecursively(dir, dir, regex, appendDefault, filenameKey, '')
  output += suffix
  fs.mkdirSync(path.join(__dirname, '../.generated'), { recursive: true })
  fs.writeFileSync(path.join(__dirname, `../.generated/${file}`), output)
  console.log(`[SCRIPTS] Generated .generated/${file}`)
}

function run() {
  generateImportsFile(
    assetsDir,
    'asset-imports.ts',
    /.(mp3|mp4|glb|gltf|fbx|bin|hdr|exr|webm|webp|riv)$/iu,
    'export const assetImports = {\n',
    '} as { [key: string]: string }\n'
  )

  generateImportsFile(
    assetsDir,
    'image-imports.ts',
    /.(jpg|jpeg|png|webp)$/iu,
    "import { StaticImageData } from 'next/image'\n\nexport const imageImports = {\n",
    '} as { [key: string]: StaticImageData }\n',
    true
  )

  generateImportsFile(
    svgsDir,
    'svg-imports.ts',
    /.svg$/iu,
    "import type { FC, SVGProps } from 'react'\n\nexport type SvgComponent = FC<SVGProps<SVGSVGElement>>\n\nexport const Svgs = {\n",
    '}\n\nexport type SvgId = keyof typeof Svgs\n',
    true,
    true
  )
}

module.exports = {
  default: run
}
