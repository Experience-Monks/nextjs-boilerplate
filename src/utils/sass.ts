import * as vars from '../styles/export-vars.module.scss'

export const sass = vars.default as unknown as { [key: string]: string }

export const colors = Object.values(sass)
  .filter((value) => value.startsWith('#'))
  .reduce<{ [key: string]: string }>((acc, entry) => {
    acc[entry[1]] = entry[0]
    return acc
  }, {})

// Usage:
// sass['white']
// sass['black']
// etc...
