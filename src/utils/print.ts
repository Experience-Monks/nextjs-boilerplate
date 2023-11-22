import { isDevEnv } from '@/utils/runtime-env'

// https://www.materialpalette.com/colors
const colors: { [key: string]: [string, string, string, string] } = {
  analytics: ['#80d8ff', '#000', '#0277bd', '#fff'],
  default: ['#9e9e9e', '#000', '#616161', '#fff'],
  sound: ['#009688', '#000', '#00796b', '#fff'],
  webgl: ['#ff9800', '#000', '#e64a19', '#fff'],
  error: ['#e64a19', '#000', '#ff0000', '#fff']
}

export const productionPrint = (label: string, ...args: string[]) => {
  if (process.env.NODE_ENV !== 'test') {
    const c = colors[label.toLowerCase()] || colors.default
    console.log(
      `%c ${label.toLowerCase()} %c ${args.join(' ')} %c`,
      `background:${c[0]}; padding: 1px; border-radius: 2px; color: ${c[1]}; margin: 0 1px 1px;`,
      `background:${c[2]}; padding: 1px; border-radius: 2px; color: ${c[3]};`,
      `background:transparent`
    )
  }
}

export const print = (label: string, ...args: string[]) => {
  if (isDevEnv() || process.env.NODE_ENV === 'development') productionPrint(label, ...args)
}
