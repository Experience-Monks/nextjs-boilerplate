type OrientationListener = (e?: Event) => void

class Service {
  listeners: OrientationListener[] = []

  onOrientation = (e: Event) => {
    this.listeners.forEach((listener) => listener(e))
  }

  listen = (listener: OrientationListener) => {
    if (this.listeners.length === 0) {
      window.addEventListener('orientationchange', this.onOrientation)
    }

    if (!this.listeners.includes(listener)) {
      this.listeners.push(listener)
    }
  }

  dismiss = (listener: OrientationListener) => {
    this.listeners = this.listeners.filter((l) => l !== listener)

    if (this.listeners.length === 0) {
      window.removeEventListener('orientationchange', this.onOrientation)
    }
  }
}

export const OrientationService = new Service()
