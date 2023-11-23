const assetPrefix = process.env.NEXT_PUBLIC_ASSET_PREFIX || ''

export function getScrollTop() {
  return window.scrollY || document.body.scrollTop
}

export function getScrollLeft() {
  return window.scrollX || document.body.scrollLeft
}

export function fixSlashes(string: string, trimEndSlash = false): string {
  let fixed = string.replace(/\/\/{1,5}/gu, '/').replace(':/', '://')
  if (fixed.endsWith('/') && trimEndSlash) fixed = fixed.slice(0, -1)
  return fixed
}

export function prefix(string: string, base = ''): string {
  return fixSlashes(`${base}${assetPrefix}/${string}`)
}

export function noop<T = void>(): T {
  return Promise.resolve() as T
}

export function formatDate(date: Date | string): string {
  const formatter = new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false
  })
  return formatter.format(typeof date === 'string' ? new Date(date) : date)
}

export function deepClone(obj: unknown) {
  if (!obj || typeof obj === 'string') return obj
  return JSON.parse(JSON.stringify(obj))
}

export const wait = (ms: number) => {
  return new Promise((r) => {
    setTimeout(r, ms)
  })
}
export const halt = wait
export const delay = wait
export const pause = wait

export function getCountdown(from: number, to: number) {
  const now = new Date(from).getTime()
  const limit = new Date(to).getTime()
  const diffTime = limit - now
  const days = diffTime < 0 ? 0 : Math.floor(diffTime / (1000 * 60 * 60 * 24))
  const hours = diffTime < 0 ? 0 : Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = diffTime < 0 ? 0 : Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = diffTime < 0 ? 0 : Math.floor((diffTime % (1000 * 60)) / 1000)
  return {
    days: days < 10 ? `0${days}` : `${days}`,
    hours: hours < 10 ? `0${hours}` : `${hours}`,
    minutes: minutes < 10 ? `0${minutes}` : `${minutes}`,
    seconds: seconds < 10 ? `0${seconds}` : `${seconds}`
  }
}

export function rem(value: number): number {
  const htmlStyle = window.getComputedStyle(document.documentElement, null).getPropertyValue('font-size')
  return parseFloat(htmlStyle) * value
}

export function safeRandom(): number {
  // https://kemilbeltre.medium.com/why-do-not-use-math-random-a6f8b0ad38dd
  // https://caniuse.com/cryptography
  const arr = new Uint32Array(1)
  crypto.getRandomValues(arr)
  return arr[0] * 2 ** -32
}

export function randomString(length = 6): string {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let result = ''
  for (let i = length; i > 0; --i) result += chars[Math.floor(safeRandom() * chars.length)]
  return result
}

export function hasDiacritic(str: string): boolean {
  return /[àáâãäèéêìíîñòóôõöùúûüń]/giu.test(str)
}

export function isImageUrl(url: string): boolean {
  return /.(bmp|cur|dds|gif|icns|ico|jpg|jpeg|ktx|png|pnm|pam|pbm|pfm|pgm|ppm|psd|svg|tiff|webp)$/iu.test(url)
}

export function download(blob: Blob, filename: string) {
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = filename
  document.body.append(link)
  link.click()
  link.remove()
}
