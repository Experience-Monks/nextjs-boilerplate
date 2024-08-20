import config from '@/data/config.json'

import { device } from '@/utils/detect'

type ResizeListener = (e?: Event | UIEvent) => void

let timeout: NodeJS.Timeout
class Service {
  listeners: ResizeListener[] = []

  onResize = (e: Event | UIEvent) => {
    clearTimeout(timeout)

    timeout = setTimeout(
      () => {
        this.listeners.forEach((listener) => listener(e))
      },
      device.mobile ? 500 : config.resizeDebounceTime // some mobile browsers only update window dimensions when the rotate animation finishes
    )
  }

  listen = (listener: ResizeListener) => {
    if (this.listeners.length === 0) {
      window.addEventListener('resize', this.onResize)

      if (device.mobile) {
        window.addEventListener('orientationchange', this.onResize)
      }
    }

    if (!this.listeners.includes(listener)) {
      this.listeners.push(listener)
    }
  }

  dismiss = (listener: ResizeListener) => {
    this.listeners = this.listeners.filter((l) => l !== listener)

    if (this.listeners.length === 0) {
      window.removeEventListener('resize', this.onResize)

      if (device.mobile) {
        window.removeEventListener('orientationchange', this.onResize)
      }
    }
  }
}

export const ResizeService = new Service()
