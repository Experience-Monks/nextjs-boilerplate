import { useState } from 'react';
import Cookies from 'js-cookie';

const COOKIE_BANNER_NAME = 'SITE_COOKIE_CONSENT';
const COOKIE_BANNER_OPTIONS = { expires: 30 };
const DEFAULT_COOKIE_CONSENT = {
  // duration
  session: false,
  persistent: false,
  // purpose
  necessary: true,
  preference: false,
  statistics: false,
  marketing: false,
  // provenance
  firstParty: false,
  thirdParty: false
};

const explicitSetCookieValue = (value: boolean) => {
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

const useCookieBanner = () => {
  const validCookie = Cookies.get(COOKIE_BANNER_NAME);
  //
  const initialConsent = typeof validCookie === 'string' ? JSON.parse(validCookie) : DEFAULT_COOKIE_CONSENT;
  const [cookieConsent, setCookieConsent] = useState(initialConsent);

  const updateCookies = (cookieSettings: typeof DEFAULT_COOKIE_CONSENT) => {
    Cookies.set(COOKIE_BANNER_NAME, JSON.stringify(cookieSettings));
    setCookieConsent(cookieSettings);
  };

  const acceptAllCookies = () => {
    const newCookieValue = explicitSetCookieValue(true);
    Cookies.set(COOKIE_BANNER_NAME, JSON.stringify(newCookieValue), COOKIE_BANNER_OPTIONS);
    setCookieConsent(newCookieValue);
  };

  const rejectAllCookies = () => {
    const newCookieValue = explicitSetCookieValue(false);
    Cookies.set(COOKIE_BANNER_NAME, JSON.stringify(newCookieValue), COOKIE_BANNER_OPTIONS);
    setCookieConsent(newCookieValue);
  };

  return { validCookie, cookieConsent, updateCookies, acceptAllCookies, rejectAllCookies };
};

export default useCookieBanner;
