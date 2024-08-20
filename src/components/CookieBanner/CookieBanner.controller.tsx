import type { FC } from 'react'
import type { CommonContent } from '@/services/cms.service'

import { memo } from 'react'

import { store } from '@/store/store'

import { View } from './CookieBanner.view'

export interface ControllerProps {
  className?: string
  content: CommonContent['cookieBanner']
}

// Controller (handles global state, router, data fetching, etc. Feeds props to the view component)
export const Controller: FC<ControllerProps> = memo((props) => {
  const cookieConsent = store((state) => state.consent.cookieConsent)
  const setCookieConsent = store((state) => state.consent.setCookieConsent)
  return !cookieConsent ? <View {...props} cookieConsent={cookieConsent} setCookieConsent={setCookieConsent} /> : null
})

Controller.displayName = 'CookieBanner_Controller'
