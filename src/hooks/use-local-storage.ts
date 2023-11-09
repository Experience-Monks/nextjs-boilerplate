import { useCallback, useEffect, useState } from 'react'

import LocalStorageService from '@/services/local-storage'

const useLocalStorage = (name: string): [value: string | undefined, setValue: (value: string) => boolean] => {
  const [value, setValue] = useState<string | undefined>()

  const setStoredValue = useCallback((value: string) => LocalStorageService.set(name, value), [name])

  useEffect(() => {
    setValue(LocalStorageService.get(name))
    const onUpdate = (n: string, value: string | undefined) => n === name && setValue(value)
    LocalStorageService.listen(onUpdate)
    return () => {
      LocalStorageService.dismiss(onUpdate)
    }
  }, [name])

  return [value, setStoredValue]
}

export default useLocalStorage
