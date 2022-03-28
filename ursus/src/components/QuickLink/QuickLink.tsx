import classnames from 'classnames';

import styles from './QuickLink.module.scss';

import { QuickLinkType } from '../../types/ursusTypes';

export type Props = {
  className?: string;
  info: QuickLinkType;
};

function QuickLink({ className, info }: Props) {
  return (
    <div className={classnames(styles.QuickLink, className)}>
      <a href={info.link} className={styles.link}>
        <span className={styles.dot} />
        <p>{info.name}</p>
      </a>
    </div>
  );
}

export default QuickLink;
