type ScrollListener = (e?: Event) => void

class Service {
  listeners: ScrollListener[] = []

  onScroll = (e: Event) => {
    this.listeners.forEach((listener) => listener(e))
  }

  listen = (listener: ScrollListener) => {
    if (this.listeners.length === 0) {
      window.addEventListener('scroll', this.onScroll, { passive: false })
    }

    if (!this.listeners.includes(listener)) {
      this.listeners.push(listener)
    }
  }

  dismiss = (listener: ScrollListener) => {
    this.listeners = this.listeners.filter((l) => l !== listener)

    if (this.listeners.length === 0) {
      window.removeEventListener('scroll', this.onScroll)
    }
  }
}

export const ScrollService = new Service()
