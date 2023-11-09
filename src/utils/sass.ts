import * as vars from '../styles/export-vars.module.scss'

const sass = vars.default as unknown as { [key: string]: string }

export const colors = Object.values(sass)
  .filter((value) => value.startsWith('#'))
  .reduce((acc, entry) => {
    acc[entry[1]] = entry[0]
    return acc
  }, {} as { [key: string]: string })

export default sass

// Usage:
// sass['white']
// sass['black']
// etc...
