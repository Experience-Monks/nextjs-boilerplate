import { FC, memo, useCallback, useEffect, useState } from 'react';
import classnames from 'classnames';

import styles from './CookieBanner.module.scss';

import CookieService from '@/services/cookie';

import { cookieBannerName } from '@/data/settings';

const cookieBannerOptions = { expires: 30 };

const copy = {
  description: 'We use cookies on this website to improve your experience.',
  ctas: {
    settings: 'Cookie Settings',
    accept: 'Accept All',
    reject: 'Reject All',
    close: 'close'
  },
  settings: {
    description:
      'You can choose not to allow some types of cookies. Click on the different options to change the default cookie settings.',
    necessary: 'Necessary',
    preference: 'Preferences',
    statistics: 'Statistics',
    marketing: 'Marketing'
  }
};

const createDefaultSettings = (value: boolean) => {
  return {
    // duration
    session: value,
    persistent: value,
    // purpose
    necessary: true,
    preference: value,
    statistics: value,
    marketing: value,
    // provenance
    firstParty: value,
    thirdParty: value
  };
};

export interface CookieBannerProps {
  className?: string;
}

const validCookie = CookieService.get(cookieBannerName);

const CookieBanner: FC<CookieBannerProps> = ({ className }) => {
  const [render, setRender] = useState(false);
  const [showCookieSetting, setShowCookieSettings] = useState(false);
  const [cookieSettings, setCookieSettings] = useState<ReturnType<typeof createDefaultSettings>>(
    typeof validCookie === 'string' ? JSON.parse(validCookie) : createDefaultSettings(false)
  );

  const handleAcceptAllCookies = useCallback(() => {
    const newCookieValue = createDefaultSettings(true);
    CookieService.set(cookieBannerName, JSON.stringify(newCookieValue), cookieBannerOptions);
    setCookieSettings(newCookieValue);
    setRender(false);
  }, []);

  const handleDeclineAllCookies = useCallback(() => {
    const newCookieValue = createDefaultSettings(false);
    CookieService.set(cookieBannerName, JSON.stringify(newCookieValue), cookieBannerOptions);
    setCookieSettings(newCookieValue);
    setRender(false);
  }, []);

  const handleCookieSettingsClick = useCallback(() => setShowCookieSettings(true), []);

  const handleCookieSettingsClose = useCallback(() => {
    CookieService.set(cookieBannerName, JSON.stringify(cookieSettings));
    setCookieSettings(cookieSettings);
    setShowCookieSettings(false);
    setRender(false);
  }, [cookieSettings]);

  const handleCookieUpdate = useCallback(
    (key, value) => setCookieSettings({ ...cookieSettings, [key]: value }),
    [cookieSettings]
  );

  useEffect(() => {
    setRender(!validCookie);
  }, []);

  return render || process.env.STORYBOOK ? (
    <div className={classnames(styles.CookieBanner, className)}>
      {showCookieSetting ? (
        <div className={styles.settings}>
          <button className={styles.close} onClick={handleCookieSettingsClose}>
            {copy.ctas.close}
          </button>

          <p className={styles.description}>{copy.settings.description}</p>

          <ul>
            <li>
              <input type="checkbox" id="cookie-necessary" checked={cookieSettings.necessary} readOnly />
              <label htmlFor="cookie-necessary">{copy.settings.necessary}</label>
            </li>
            <li>
              <input
                type="checkbox"
                id="cookie-preference"
                checked={cookieSettings.preference}
                onChange={(e) => handleCookieUpdate('preference', e.target.checked)}
              />
              <label htmlFor="cookie-preference">{copy.settings.preference}</label>
            </li>
            <li>
              <input
                type="checkbox"
                id="cookie-statistics"
                checked={cookieSettings.statistics}
                onChange={(e) => handleCookieUpdate('statistics', e.target.checked)}
              />
              <label htmlFor="cookie-statistics">{copy.settings.statistics}</label>
            </li>
            <li>
              <input
                type="checkbox"
                id="cookie-marketing"
                checked={cookieSettings.marketing}
                onChange={(e) => handleCookieUpdate('marketing', e.target.checked)}
              />
              <label htmlFor="cookie-marketing">{copy.settings.marketing}</label>
            </li>
          </ul>
        </div>
      ) : (
        <div className={styles.base}>
          <p className={styles.description}>{copy.description}</p>
          <div className={styles.buttons}>
            <button onClick={handleAcceptAllCookies}>{copy.ctas.accept}</button>
            <button onClick={handleDeclineAllCookies}>{copy.ctas.reject}</button>
            <button onClick={handleCookieSettingsClick}>{copy.ctas.settings}</button>
          </div>
        </div>
      )}
    </div>
  ) : null;
};

export default memo(CookieBanner);
