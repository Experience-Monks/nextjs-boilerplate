import type { CookieConsent } from '@/store/consent.slice'
import type { AppState } from '@/store/store'
import type { ControllerProps } from './CookieBanner.controller'

import { type FC, useCallback, useState } from 'react'
import classNames from 'classnames'

import css from './CookieBanner.module.scss'

import { copy } from '@/utils/copy'

import { useRefs } from '@/hooks/use-refs'

export interface ViewProps extends ControllerProps {
  cookieConsent: AppState['consent']['cookieConsent']
  setCookieConsent: AppState['consent']['setCookieConsent']
}

export type ViewRefs = {
  root: HTMLDivElement
}

// View (pure and testable component, receives props exclusively from the controller)
export const View: FC<ViewProps> = ({ className, content, cookieConsent, setCookieConsent }) => {
  const refs = useRefs<ViewRefs>()

  const [settings, setSettings] = useState(false)
  const [consent, setConsent] = useState<CookieConsent>(
    cookieConsent ?? {
      session: false,
      persistent: false,
      necessary: true,
      preference: false,
      statistics: false,
      marketing: false,
      firstParty: false,
      thirdParty: false
    }
  )

  const handleAcceptAll = useCallback(() => {
    setCookieConsent({
      session: true,
      persistent: true,
      necessary: true,
      preference: true,
      statistics: true,
      marketing: true,
      firstParty: true,
      thirdParty: true
    })
  }, [setCookieConsent])

  const handleDeclineAll = useCallback(() => {
    setCookieConsent({
      session: false,
      persistent: false,
      necessary: true,
      preference: false,
      statistics: false,
      marketing: false,
      firstParty: false,
      thirdParty: false
    })
  }, [setCookieConsent])

  const handleSettingsOpen = useCallback(() => {
    setSettings(true)
  }, [])

  const handleSettingsClose = useCallback(() => {
    setCookieConsent(consent)
    setSettings(false)
  }, [setCookieConsent, consent])

  const handleUpdate = useCallback(
    (key: keyof CookieConsent, value: boolean) => {
      setConsent({ ...consent, [key]: value })
    },
    [consent]
  )

  return (
    <div className={classNames('CookieBanner', css.root, className)} ref={refs.root}>
      <p className={css.description} {...copy.html(content.description)} />

      <div className={css.buttonContainer}>
        <button onClick={handleAcceptAll}>
          <span {...copy.html(content.ctas.accept)} />
        </button>

        <button onClick={handleDeclineAll}>
          <span {...copy.html(content.ctas.reject)} />
        </button>
        <button onClick={handleSettingsOpen}>
          <span {...copy.html(content.ctas.settings)} />
        </button>
      </div>

      {settings && (
        <div className={css.cookieSettings}>
          <button className={css.cookieSettingsClose} onClick={handleSettingsClose}>
            <span {...copy.html(content.ctas.close)} />
          </button>

          <div className={css.cookieSettingsContent}>
            <p className={css.cookieSettingsDescription} {...copy.html(content.settings)} />

            <ul>
              <li>
                <input type="checkbox" id="cookie-necessary" checked={consent?.necessary} readOnly />
                <label htmlFor="cookie-necessary" {...copy.html(content.purpose.necessary)} />
              </li>
              <li>
                <input
                  type="checkbox"
                  id="cookie-preference"
                  checked={consent?.preference}
                  onChange={(e) => {
                    handleUpdate('preference', e.target.checked)
                  }}
                />
                <label htmlFor="cookie-preference" {...copy.html(content.purpose.preference)} />
              </li>
              <li>
                <input
                  type="checkbox"
                  id="cookie-statistics"
                  checked={consent?.statistics}
                  onChange={(e) => {
                    handleUpdate('statistics', e.target.checked)
                  }}
                />
                <label htmlFor="cookie-statistics" {...copy.html(content.purpose.statistics)} />
              </li>
              <li>
                <input
                  type="checkbox"
                  id="cookie-marketing"
                  checked={consent?.marketing}
                  onChange={(e) => {
                    handleUpdate('marketing', e.target.checked)
                  }}
                />
                <label htmlFor="cookie-marketing" {...copy.html(content.purpose.marketing)} />
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

View.displayName = 'CookieBanner_View'
