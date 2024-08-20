import { useCallback, useEffect, useState } from 'react'

import { CookieService } from '@/services/cookie.service'

export const useCookie = (name: string): [value: string | undefined, setValue: (value: string) => void] => {
  const [value, setValue] = useState<string | undefined>()

  const setStoredValue = useCallback((val: string) => CookieService.set(name, val), [name])

  useEffect(() => {
    setValue(CookieService.get(name))
    const onUpdate = (n: string, val: string | undefined) => n === name && setValue(val)
    CookieService.listen(onUpdate)
    return () => {
      CookieService.dismiss(onUpdate)
    }
  }, [name])

  return [value, setStoredValue]
}
