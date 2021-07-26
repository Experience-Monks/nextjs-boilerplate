import React, { memo, useCallback, useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import checkProps from '@jam3/react-check-extra-props';
import noop from 'no-op';

import styles from './CookieBanner.module.scss';

function CookieBanner({ className, children, cookieConsent, onUpdate, onAccept, onReject }) {
  const [cookieSettings, setCookieSettings] = useState(cookieConsent);
  const [showCookieSetting, setShowCookieSettings] = useState(false);

  const handleAcceptAllCookies = useCallback(() => {
    onAccept();
  }, [onAccept]);

  const handleDeclineAllCookies = useCallback(() => {
    onReject();
  }, [onReject]);

  const handleCookieSettingsClick = useCallback(() => {
    setShowCookieSettings(true);
  }, []);

  const handleCookieSettingsClose = useCallback(() => {
    setShowCookieSettings(false);
    onUpdate(cookieSettings);
  }, [onUpdate, cookieSettings]);

  const handleCookieUpdate = useCallback(
    (key, value) => {
      setCookieSettings({ ...cookieSettings, [key]: value });
    },
    [cookieSettings]
  );

  return (
    <div className={classnames(styles.CookieBanner, className)}>
      <p className={styles.description}>{children || 'We use cookies on this website to improve your experience.'}</p>

      <div className={styles.buttonContainer}>
        <button onClick={handleAcceptAllCookies}>Accept all</button>
        <button onClick={handleDeclineAllCookies}>Reject all</button>
        <button onClick={handleCookieSettingsClick}>Cookie settings</button>
      </div>

      {showCookieSetting && (
        <div className={styles.cookieSettings}>
          <button className={styles.cookieSettingsClose} onClick={handleCookieSettingsClose}>
            close
          </button>

          <div className={styles.cookieSettingsContent}>
            <p className={styles.cookieSettingsDescription}>
              Ullamco deserunt dolore officia cillum ea culpa eu. Voluptate ex in commodo in dolor magna velit pariatur
              in nostrud enim tempor aliquip nisi.
            </p>

            <ul>
              <li>
                <input type="checkbox" id="cookie-necessary" checked={cookieSettings.necessary} readOnly />
                <label>necessary</label>
              </li>
              <li>
                <input
                  type="checkbox"
                  id="cookie-preference"
                  checked={cookieSettings.preference}
                  onChange={(e) => handleCookieUpdate('preference', e.target.checked)}
                />
                <label>preference</label>
              </li>
              <li>
                <input
                  type="checkbox"
                  id="cookie-statistics"
                  checked={cookieSettings.statistics}
                  onChange={(e) => handleCookieUpdate('statistics', e.target.checked)}
                />
                <label>statistics</label>
              </li>
              <li>
                <input
                  type="checkbox"
                  id="cookie-marketing"
                  checked={cookieSettings.marketing}
                  onChange={(e) => handleCookieUpdate('marketing', e.target.checked)}
                />
                <label>marketing</label>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

CookieBanner.propTypes = checkProps({
  className: PropTypes.string,
  defaultText: PropTypes.string,
  acceptCta: PropTypes.string,
  rejectCta: PropTypes.string,
  cookieConsent: PropTypes.shape({
    // duration
    session: PropTypes.bool,
    persistent: PropTypes.bool,
    // purpose
    necessary: PropTypes.bool,
    preference: PropTypes.bool,
    statistics: PropTypes.bool,
    marketing: PropTypes.bool,
    // provenance
    firstParty: PropTypes.bool,
    thirdParty: PropTypes.bool
  }),
  onAccept: PropTypes.func,
  onUpdate: PropTypes.func,
  onReject: PropTypes.func
});

CookieBanner.defaultProps = {
  defaultText: 'We use cookies on this website to improve your experience.',
  acceptCta: 'Accept cookies',
  rejectCta: 'No thanks',
  onAccept: noop,
  onUpdate: noop,
  onReject: noop
};

export default memo(CookieBanner);
