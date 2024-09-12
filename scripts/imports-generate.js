const fs = require('node:fs')
const path = require('node:path')

const srcPath = path.join(__dirname, '../src/')
const assetsDir = path.join(srcPath, '/assets/')
const svgsDir = path.join(srcPath, '/svgs/')

function readRecursively(directory, base, regex, append = '', filenameKey = false, lines = '') {
  let l = lines
  if (fs.existsSync(directory)) {
    const dirents = fs.readdirSync(directory, { withFileTypes: true })
    for (const dirent of dirents) {
      const item = path.join(directory, dirent.name).replace(/\\/gu, '/')
      if (dirent.isDirectory()) {
        l = readRecursively(item, base, regex, append, filenameKey, l)
      } else if (regex.test(item)) {
        const k = filenameKey ? item.replace(base, '').replace(/\.[^/.]+$/iu, '') : item.replace(base, '@/assets/')
        const p = item.replace(srcPath, '@/')
        const entry = `'${k}': require('${p}')${append}`.replace(/\\/gu, '/')
        l += `  ${entry},\n`
      }
    }
  }
  return l
}

function generateImportsFile(dir, file, regex, prefix, suffix, append = '', filenameKey = false) {
  let output = prefix
  const forwardSlashDir = dir.replace(/\\/gu, '/')
  output += readRecursively(forwardSlashDir, forwardSlashDir, regex, append, filenameKey, '')
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
    '}\n\nexport type AssetId = keyof typeof assetImports\n',
    ' as string'
  )

  generateImportsFile(
    assetsDir,
    'image-imports.ts',
    /.(jpg|jpeg|png|webp)$/iu,
    "import { StaticImageData } from 'next/image'\n\nexport const imageImports = {\n",
    '}\n\nexport type ImageId = keyof typeof imageImports\n',
    '.default as StaticImageData'
  )

  generateImportsFile(
    svgsDir,
    'svg-imports.ts',
    /.svg$/iu,
    "import type { FC, SVGProps } from 'react'\n\nexport type SvgComponent = FC<SVGProps<SVGSVGElement>>\n\nexport const Svgs = {\n",
    '}\n\nexport type SvgId = keyof typeof Svgs\n',
    '.default as SvgComponent',
    true
  )
}

run()

exports.default = run
