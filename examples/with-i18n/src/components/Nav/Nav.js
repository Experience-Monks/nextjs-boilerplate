import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import checkProps from '@jam3/react-check-extra-props';
import Link from 'next/link';

import styles from './Nav.module.scss';

import jam3LogoSrc from '../../assets/images/threeLogo.jpeg';
import githubLogoSrc from '../../assets/images/github-icon-64b.png';

import { i18n, withTranslation } from '../../../i18n';

const LINKS = [
  { href: 'https://jam3.com', label: 'Jam3', src: jam3LogoSrc },
  { href: 'https://github.com/jam3', label: 'GitHub', src: githubLogoSrc }
].map(link => ({
  ...link,
  key: `nav-link-${link.href}-${link.label}`
}));

function Nav({ t }) {
  return (
    <nav className={classnames(styles.Nav)}>
      <div className={styles.wrapper}>
        <ul className={styles.routes}>
          <li>
            <Link href="/">
              <a>{t('nav.home')}</a>
            </Link>
          </li>

          <li>
            <Link href="/about">
              <a>{t('nav.about')}</a>
            </Link>
          </li>
        </ul>

        <ul className={styles.links}>
          {LINKS.map(({ key, href, label, src }) => (
            <li key={key}>
              <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                <img src={src} alt={label} />
              </a>
            </li>
          ))}
        </ul>

        <button type="button" onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'fr' : 'en')}>
          {t('nav.change-locale')}
        </button>
      </div>
    </nav>
  );
}

Nav.getInitialProps = async () => ({
  namespacesRequired: ['common']
});

Nav.propTypes = checkProps({
  namespacesRequired: PropTypes.any,
  i18n: PropTypes.object,
  t: PropTypes.func.isRequired,
  tReady: PropTypes.bool
});

export default withTranslation('common')(Nav);
