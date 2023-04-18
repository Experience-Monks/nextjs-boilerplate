import { FC, memo, PropsWithChildren, useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import noop from 'no-op';

import css from './CookieBanner.module.scss';

const copy = {
  settings: 'Cookie Settings',
  close: 'close',
  description:
    'Ullamco deserunt dolore officia cillum ea culpa eu. Voluptate ex in commodo in dolor magna velit pariatur in nostrud enim tempor aliquip nisi.',
  purpose: {
    necessary: 'necessary',
    preference: 'preference',
    statistics: 'statistics',
    marketing: 'marketing'
  },
  defaultText: 'We use cookies on this website to improve your experience.',
  accept: 'Accept All',
  reject: 'Reject All'
};

type CookieConsentProps = {
  // duration
  session: boolean;
  persistent: boolean;
  // purpose
  necessary: boolean;
  preference: boolean;
  statistics: boolean;
  marketing: boolean;
  // provenance
  firstParty: boolean;
  thirdParty: boolean;
};

export type CookieBannerProps = PropsWithChildren<{
  className?: string;
  defaultText?: string;
  acceptCta?: string;
  rejectCta?: string;
  cookieConsent: CookieConsentProps;
  onAccept(): void;
  onUpdate(arg0: CookieConsentProps): void;
  onReject(): void;
}>;

const CookieBanner: FC<CookieBannerProps> = ({
  className,
  defaultText = copy.defaultText,
  acceptCta = copy.accept,
  rejectCta = copy.reject,
  cookieConsent,
  onUpdate = noop,
  onAccept = noop,
  onReject = noop,
  children
}) => {
  const [cookieSettings, setCookieSettings] = useState(cookieConsent);
  const [showCookieSetting, setShowCookieSettings] = useState(false);

  const handleAcceptAllCookies = useCallback(() => {
    onAccept();
    handleCookieBannerInteraction();
  }, [onAccept]);

  const handleDeclineAllCookies = useCallback(() => {
    onReject();
    handleCookieBannerInteraction();
  }, [onReject]);

  const handleCookieSettingsClick = useCallback(() => {
    setShowCookieSettings(true);
    handleCookieBannerInteraction();
  }, []);

  const handleCookieSettingsClose = useCallback(() => {
    setShowCookieSettings(false);
    onUpdate(cookieSettings);
    handleCookieBannerInteraction();
  }, [onUpdate, cookieSettings]);

  const handleCookieUpdate = useCallback(
    (key: string, value: boolean) => {
      setCookieSettings({ ...cookieSettings, [key]: value });
      handleCookieBannerInteraction();
    },
    [cookieSettings]
  );

  const handleCookieBannerInteraction = () => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'cookieBanner'
    });
    console.log(window.dataLayer);
  };

  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'CookieBanner.tsx'
    });
  }, []);

  return (
    <div className={classNames('CookieBanner', css.root, className)}>
      <p className={css.description}>{children || defaultText}</p>

      <div className={css.buttonContainer}>
        <button onClick={handleAcceptAllCookies}>{acceptCta}</button>
        <button onClick={handleDeclineAllCookies}>{rejectCta}</button>
        <button onClick={handleCookieSettingsClick}>{copy.settings}</button>
      </div>

      {showCookieSetting && (
        <div className={css.cookieSettings}>
          <button className={css.cookieSettingsClose} onClick={handleCookieSettingsClose}>
            {copy.close}
          </button>

          <div className={css.cookieSettingsContent}>
            <p className={css.cookieSettingsDescription}>{copy.description}</p>

            <ul>
              <li>
                <input
                  type="checkbox"
                  id="cookie-necessary"
                  checked={cookieSettings?.necessary}
                  onClick={() => handleCookieBannerInteraction()}
                  readOnly
                />
                <label htmlFor="cookie-necessary">{copy.purpose.necessary}</label>
              </li>
              <li>
                <input
                  type="checkbox"
                  id="cookie-preference"
                  checked={cookieSettings?.preference}
                  onChange={(e) => handleCookieUpdate('preference', e.target.checked)}
                  // onClick={() => handleCookieBannerInteraction()}
                />
                <label htmlFor="cookie-preference">{copy.purpose.preference}</label>
              </li>
              <li>
                <input
                  type="checkbox"
                  id="cookie-statistics"
                  checked={cookieSettings?.statistics}
                  onChange={(e) => handleCookieUpdate('statistics', e.target.checked)}
                  // onClick={() => handleCookieBannerInteraction()}
                />
                <label htmlFor="cookie-statistics">{copy.purpose.statistics}</label>
              </li>
              <li>
                <input
                  type="checkbox"
                  id="cookie-marketing"
                  checked={cookieSettings?.marketing}
                  onChange={(e) => handleCookieUpdate('marketing', e.target.checked)}
                  // onClick={() => handleCookieBannerInteraction()}
                />
                <label htmlFor="cookie-marketing">{copy.purpose.marketing}</label>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(CookieBanner);
