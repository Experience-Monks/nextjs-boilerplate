import { useCallback, useMemo } from 'react'

import config from '@/data/config.json'

import useLocalStorage from './use-local-storage'

type FlagId = keyof typeof config.featureFlags

function useFeatureFlags(): [{ [key in FlagId]: boolean }, (name: FlagId, enabled: boolean) => void, () => void] {
  const [storedFlags, setStoredFlags] = useLocalStorage('featureFlags')

  const flags = useMemo(() => {
    const defaultFlags = Object.entries(config.featureFlags).reduce(
      (acc, [key, val]) => ({ ...acc, [key]: val.enabled }),
      {}
    )
    try {
      return JSON.parse(storedFlags || 'null') ?? defaultFlags
    } catch (e) {
      return defaultFlags
    }
  }, [storedFlags])

  const setFlag = useCallback(
    (name: FlagId, enabled: boolean) => {
      setStoredFlags(JSON.stringify({ ...flags, [name]: enabled }))
    },
    [flags, setStoredFlags]
  )

  const reset = useCallback(() => {
    setStoredFlags('')
  }, [setStoredFlags])

  return [flags, setFlag, reset]
}

export default useFeatureFlags
