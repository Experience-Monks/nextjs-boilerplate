type RequestAnimationFrameListener = ((delta?: number) => void) | ((delta: number) => void)

class Service {
  listeners: RequestAnimationFrameListener[] = []
  frameId = 0
  elapsed = 0

  onFrame = () => {
    const now = Date.now()
    const delta = now - this.elapsed
    this.elapsed = now
    this.listeners.forEach((listener) => listener(delta))
    this.frameId = requestAnimationFrame(this.onFrame)
  }

  listen = (listener: RequestAnimationFrameListener) => {
    if (!this.listeners.includes(listener)) {
      this.listeners.push(listener)
    }

    if (!this.frameId) {
      this.elapsed = Date.now()
      this.frameId = requestAnimationFrame(this.onFrame)
    }
  }

  dismiss = (listener: RequestAnimationFrameListener) => {
    this.listeners = this.listeners.filter((l) => l !== listener)

    if (this.listeners.length === 0) {
      cancelAnimationFrame(this.frameId)
      this.frameId = 0
    }
  }
}

export const RafService = new Service()
