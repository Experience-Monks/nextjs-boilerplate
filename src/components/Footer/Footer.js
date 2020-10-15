import React, { memo } from 'react';
import classnames from 'classnames';
import checkProps from '@jam3/react-check-extra-props';
import Link from 'next/link';

import styles from './Footer.module.scss';

import routes from '../../data/routes';

function Footer() {
  return (
    <footer className={classnames(styles.Footer)}>
      <ul>
        {Object.values(routes).map(({ path, title }) => (
          <li key={path}>
            <Link href={path}>
              <a>{title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </footer>
  );
}

Footer.propTypes = checkProps({});

Footer.defaultProps = {};

export default memo(Footer);
