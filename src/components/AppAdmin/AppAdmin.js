import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import checkProps from '@jam3/react-check-extra-props';

import styles from './AppAdmin.module.scss';

import detect from '../../utils/detect';

function AppAdmin({ className }) {
  const [closed, setClosed] = useState(true);

  return (
    <div className={classnames(styles.AppAdmin, className)} onClick={() => setClosed(!closed)}>
      <p>
        <span>{closed ? '[<]' : '[>] '}</span>
        {!closed && (
          <span>
            {`${process.env.NEXT_PUBLIC_ENVIRONMENT} | ${detect?.device.getType()} |
            ${detect?.os.getName()} ${detect?.os.getVersion()} | ${detect?.browser.getName()} |`}

            {process.env.NEXT_PUBLIC_COMMIT_COUNT ? `${process.env.NEXT_PUBLIC_COMMIT_COUNT} |` : ''}
            {process.env.NEXT_PUBLIC_COMMIT_ID ? `${process.env.NEXT_PUBLIC_COMMIT_ID} | ` : ''}
            {process.env.NEXT_PUBLIC_BUILD_TIME ? `${process.env.NEXT_PUBLIC_BUILD_TIME} | ` : ''}
            {process.env.NEXT_PUBLIC_PULL_REQUEST && (
              <a href={process.env.NEXT_PUBLIC_PULL_REQUEST} rel="noopener noreferrer">
                PR link
              </a>
            )}
          </span>
        )}
      </p>
    </div>
  );
}

AppAdmin.propTypes = checkProps({
  className: PropTypes.string
});

AppAdmin.defaultProps = {};

export default memo(AppAdmin);
