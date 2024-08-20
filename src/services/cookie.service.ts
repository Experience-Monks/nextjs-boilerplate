import Cookies from 'js-cookie'

type CookieListener = (name: string, value: string | undefined) => void

class Service {
  listeners: CookieListener[] = []

  set = (name: string, value: string, options?: Cookies.CookieAttributes) => {
    Cookies.set(name, value, { expires: 30, ...options })
    this.listeners.forEach((listener) => listener(name, value))
  }

  get = (name: string) => {
    return Cookies.get(name)
  }

  delete = (name: string) => {
    return Cookies.remove(name)
  }

  listen = (listener: CookieListener) => {
    if (!this.listeners.includes(listener)) {
      this.listeners.push(listener)
    }
  }

  dismiss = (listener: CookieListener) => {
    this.listeners = this.listeners.filter((l) => l !== listener)
  }
}

export const CookieService = new Service()
