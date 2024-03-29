import { device } from '@/utils/detect'

type PointerMoveListener = (x?: number, y?: number, e?: MouseEvent | TouchEvent) => void

class Service {
  listeners: PointerMoveListener[] = []

  onMove = (e: MouseEvent | TouchEvent) => {
    const x = (e as TouchEvent).targetTouches?.[0]?.clientX || (e as MouseEvent).clientX
    const y = (e as TouchEvent).targetTouches?.[0]?.clientY || (e as MouseEvent).clientY

    this.listeners.forEach((listener) => listener(x, y, e))
  }

  listen = (listener: PointerMoveListener) => {
    if (this.listeners.length === 0) {
      window.addEventListener(device.mobile ? 'touchmove' : 'mousemove', this.onMove)
    }

    if (!this.listeners.includes(listener)) {
      this.listeners.push(listener)
    }
  }

  dismiss = (listener: PointerMoveListener) => {
    this.listeners = this.listeners.filter((l) => l !== listener)

    if (this.listeners.length === 0) {
      window.removeEventListener(device.mobile ? 'touchmove' : 'mousemove', this.onMove)
    }
  }
}

export const PointerMoveService = new Service()
