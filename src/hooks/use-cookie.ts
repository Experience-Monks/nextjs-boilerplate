import { useCallback, useEffect, useState } from 'react'

import CookieService from '@/services/cookie'

const useCookie = (name: string): [value: string | undefined, setValue: (value: string) => void] => {
  const [value, setValue] = useState<string | undefined>()

  const setStoredValue = useCallback((value: string) => CookieService.set(name, value), [name])

  useEffect(() => {
    setValue(CookieService.get(name))
    const onUpdate = (n: string, value: string | undefined) => n === name && setValue(value)
    CookieService.listen(onUpdate)
    return () => {
      CookieService.dismiss(onUpdate)
    }
  }, [name])

  return [value, setStoredValue]
}

export default useCookie
