type LocalStorageListener = (name: string, value: string | undefined) => void;

const KEY = 'NEXTJS-BOILERPLATE';

class Service {
  listeners: LocalStorageListener[] = [];

  set = (name: string, value: string): boolean => {
    try {
      if (value !== undefined) {
        const serializedData = localStorage.getItem(KEY);

        if (serializedData === null) {
          localStorage.setItem(KEY, JSON.stringify({ [name]: value }));
        } else {
          localStorage.setItem(KEY, JSON.stringify({ ...JSON.parse(serializedData), [name]: value }));
        }
      }

      this.listeners.forEach((listener) => listener(name, value));

      return true;
    } catch (e) {
      // no local storage (ssr or incognito mode)
      return false;
    }
  };

  get = (name: string): string | null => {
    try {
      const serializedData = localStorage.getItem(KEY);

      if (!serializedData) {
        return null;
      }

      return JSON.parse(serializedData)[name] || null;
    } catch (e) {
      // no local storage (ssr or incognito mode)
      return null;
    }
  };

  listen = (listener: LocalStorageListener) => {
    if (!this.listeners.includes(listener)) {
      this.listeners.push(listener);
    }
  };

  dismiss = (listener: LocalStorageListener) => {
    this.listeners = this.listeners.filter((l) => l !== listener);
  };
}
const LocalStorageService = new Service();

export default LocalStorageService;
