const fs = require('fs')
const path = require('path')

const assetsDir = path.join(__dirname, '../src/assets/')

let output = 'export default {\n'

function readRecursively(directory, base) {
  if (fs.existsSync(directory)) {
    const dirents = fs.readdirSync(directory, { withFileTypes: true })

    for (const dirent of dirents) {
      const item = path.join(directory, dirent.name)
      if (dirent.isDirectory()) {
        readRecursively(item, base)
      } else {
        if (!/.(woff|woff2|DS_Store|txt|gitkeep)$/i.test(item)) {
          const p = item.replace(base, '@/assets/')
          output += `  '${p}': require('${p}').default,\n`
        }
      }
    }
  }
}

readRecursively(assetsDir, assetsDir)

output += '} as { [key: string]: string }\n'

fs.mkdirSync(path.join(__dirname, '../.generated'), { recursive: true })
fs.writeFileSync(path.join(__dirname, '../.generated/asset-imports.ts'), output)

console.log('.generated/asset-imports.ts written.')
