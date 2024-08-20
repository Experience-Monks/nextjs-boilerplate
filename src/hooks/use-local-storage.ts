import { useCallback, useEffect, useState } from 'react'

import { LocalStorageService } from '@/services/local-storage.service'

export const useLocalStorage = (name: string): [value: string | undefined, setValue: (value: string) => boolean] => {
  const [value, setValue] = useState<string | undefined>()

  const setStoredValue = useCallback((val: string) => LocalStorageService.set(name, val), [name])

  useEffect(() => {
    setValue(LocalStorageService.get(name))
    const onUpdate = (n: string, val: string | undefined) => n === name && setValue(val)
    LocalStorageService.listen(onUpdate)
    return () => {
      LocalStorageService.dismiss(onUpdate)
    }
  }, [name])

  return [value, setStoredValue]
}
