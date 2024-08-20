type LocalStorageListener = (name: string, value: string | undefined) => void

const KEY = 'NEXTJS-BOILERPLATE'

class Service {
  listeners: LocalStorageListener[] = []

  set = (name: string, value: string): boolean => {
    try {
      if (value !== undefined) {
        const serializedData = localStorage.getItem(KEY)

        if (serializedData === null) {
          localStorage.setItem(KEY, JSON.stringify({ [name]: value }))
        } else {
          localStorage.setItem(KEY, JSON.stringify({ ...JSON.parse(serializedData), [name]: value }))
        }
      }

      this.listeners.forEach((listener) => listener(name, value))

      return true
    } catch {
      // no local storage (ssr or incognito mode)
      return false
    }
  }

  get = (name: string): string | undefined => {
    try {
      const serializedData = localStorage.getItem(KEY)

      if (!serializedData) {
        return undefined
      }

      return JSON.parse(serializedData)[name] || undefined
    } catch {
      // no local storage (ssr or incognito mode)
      return undefined
    }
  }

  listen = (listener: LocalStorageListener) => {
    if (!this.listeners.includes(listener)) {
      this.listeners.push(listener)
    }
  }

  dismiss = (listener: LocalStorageListener) => {
    this.listeners = this.listeners.filter((l) => l !== listener)
  }
}

export const LocalStorageService = new Service()
