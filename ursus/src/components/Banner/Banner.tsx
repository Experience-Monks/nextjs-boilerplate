import classnames from 'classnames';

import styles from './Banner.module.scss';

import { CONSTANTS } from './../../utils/constants';

import { LicenseTipContent } from '../../types/ursusTypes';
import ErrorIcon from '../svgs/error.svg';
import InfoIcon from '../svgs/info.svg';

export type Props = {
  className?: string;
  message?: LicenseTipContent;
};

function renderMessage(message: LicenseTipContent) {
  switch (message.type) {
    case CONSTANTS.ERROR:
      return (
        <div className={styles.messageWrapper}>
          <ErrorIcon className={styles.errorIcon} />
          <p className={classnames(styles.message, styles.error)}>{message.message}</p>
        </div>
      );
    case CONSTANTS.INFO:
      return (
        <div className={styles.messageWrapper}>
          <InfoIcon className={styles.infoIcon} />
          <p className={classnames(styles.message, styles.info)}>{message.message}</p>
        </div>
      );
    default:
      return null;
  }
}

function Banner({ className, message }: Props) {
  if (!message) return null;
  return <div className={classnames(styles.Banner, className)}>{renderMessage(message)}</div>;
}

export default Banner;
