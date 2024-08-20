import config from '@/data/config.json'

import { LocalStorageService } from './local-storage.service'

export type FeatureFlagId = keyof typeof config.featureFlags
export type FeatureFlags = { [key in FeatureFlagId]: boolean }
export type FeatureFlagListener = (flags: FeatureFlags) => void

const defaultFlags = Object.entries(config.featureFlags).reduce(
  (acc, [key, val]) => ({ ...acc, [key]: val.enabled }),
  {} as FeatureFlags
)

class Service {
  listeners: FeatureFlagListener[] = []

  set = (name: FeatureFlagId, enabled: boolean) => {
    const flags = this.getAll()
    if (flags[name] === enabled) return
    const newFlags = { ...flags, [name]: enabled }
    LocalStorageService.set('featureFlags', JSON.stringify(newFlags))
    this.listeners.forEach((listener) => listener(newFlags))
  }

  get = (name: FeatureFlagId): boolean => {
    const flags = this.getAll()
    return flags[name] || false
  }

  reset = () => {
    LocalStorageService.set('featureFlags', JSON.stringify(defaultFlags))
    this.listeners.forEach((listener) => listener(this.getAll()))
  }

  getAll = (): FeatureFlags => {
    const storedFlags = LocalStorageService.get('featureFlags')
    try {
      return JSON.parse(storedFlags || 'null') ?? defaultFlags
    } catch {
      return defaultFlags
    }
  }

  listen = (listener: FeatureFlagListener) => {
    if (!this.listeners.includes(listener)) this.listeners.push(listener)
  }

  dismiss = (listener: FeatureFlagListener) => {
    this.listeners = this.listeners.filter((l) => l !== listener)
  }
}

export const FeatureFlagService = new Service()
