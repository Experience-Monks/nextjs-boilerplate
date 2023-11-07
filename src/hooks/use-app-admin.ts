import { useCallback, useState } from 'react'

import CookieService from '@/services/cookie'

const localStorageOptions = btoa('options')
const initialOptions = {
  animateInHome: true
}

function useAppAdmin() {
  const [options, setOptions] = useState<{ [key: string]: unknown }>(() => {
    return CookieService.get(localStorageOptions)
      ? JSON.parse(atob(CookieService.get(localStorageOptions) as string))
      : initialOptions
  })

  const changeOption = useCallback(
    (key: string, value: boolean | string) => {
      const newValue = { ...options, [key]: value }

      CookieService.set(localStorageOptions, btoa(JSON.stringify(newValue)))
      setOptions(newValue)
    },
    [options]
  )

  const getOption = useCallback(
    (option?: string) => {
      return option ? options[option] : options
    },
    [options]
  )

  const resetOptions = useCallback(() => {
    CookieService.delete(localStorageOptions)

    setOptions(initialOptions)
  }, [])

  return {
    options,
    resetOptions,
    getOption,
    changeOption
  }
}

export default useAppAdmin
