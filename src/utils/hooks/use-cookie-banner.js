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

const explicitSetCookieValue = (value) => {
  return JSON.stringify({
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
  });
};

const useCookieBanner = () => {
  const validCookie = Boolean(Cookies.get(COOKIE_BANNER_NAME));
  const initialConsent = validCookie ? JSON.parse(Cookies.get(COOKIE_BANNER_NAME)) : DEFAULT_COOKIE_CONSENT;
  const [cookieConsent, setCookieConsent] = useState(initialConsent);

  const updateCookies = (cookieSettings) => {
    Cookies.set(COOKIE_BANNER_NAME, JSON.stringify(cookieSettings));
    setCookieConsent(JSON.parse(Cookies.get(COOKIE_BANNER_NAME)));
  };

  const acceptAllCookies = () => {
    Cookies.set(COOKIE_BANNER_NAME, explicitSetCookieValue(true), COOKIE_BANNER_OPTIONS);
    setCookieConsent(JSON.parse(Cookies.get(COOKIE_BANNER_NAME)));
  };

  const rejectAllCookies = () => {
    Cookies.set(COOKIE_BANNER_NAME, explicitSetCookieValue(false), COOKIE_BANNER_OPTIONS);
    setCookieConsent(JSON.parse(Cookies.get(COOKIE_BANNER_NAME)));
  };

  return { validCookie, cookieConsent, updateCookies, acceptAllCookies, rejectAllCookies };
};

export default useCookieBanner;
