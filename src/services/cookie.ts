import Cookies from 'js-cookie';

type CookieListener = (name: string, value: string | undefined) => void;

class Service {
  listeners: CookieListener[] = [];

  set = (name: string, value: string, options: Cookies.CookieAttributes = { expires: 30 }) => {
    Cookies.set(name, value, options);
    this.listeners.forEach((listener) => listener(name, value));
  };

  get = (name: string) => {
    return Cookies.get(name);
  };

  listen = (listener: CookieListener) => {
    if (!this.listeners.includes(listener)) {
      this.listeners.push(listener);
    }
  };

  dismiss = (listener: CookieListener) => {
    this.listeners = this.listeners.filter((l) => l !== listener);
  };
}

const CookieService = new Service();

export default CookieService;
