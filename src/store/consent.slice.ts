import type { AppState, Mutators } from './store'
import type { StateCreator } from 'zustand'

import { CookieService } from '@/services/cookie.service'

export type CookieConsent = {
  necessary: boolean
  persistent: boolean
  preference: boolean
  statistics: boolean
  firstParty: boolean
  thirdParty: boolean
  marketing: boolean
  session: boolean
}

export type ConsentSliceState = {
  consent: {
    // getters
    cookieConsent: CookieConsent | null
    // setters
    setCookieConsent: (cookieConsent: CookieConsent) => void
  }
}

export const ConsentSlice: StateCreator<AppState, Mutators, [], ConsentSliceState> = (set) => ({
  consent: {
    cookieConsent: JSON.parse(CookieService.get('cookieConsent') || 'null'),

    setCookieConsent: (cookieConsent) => {
      set((state) => {
        state.consent.cookieConsent = cookieConsent
        CookieService.set('cookieConsent', JSON.stringify(cookieConsent))
      })
    }
  }
})
