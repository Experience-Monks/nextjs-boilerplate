import classnames from 'classnames';

import styles from './Container.module.scss';

import { CONSTANTS } from './../../utils/constants';
import { ContainerItem } from './../../types/ursusTypes';

export type Props = {
  className?: string;
  list: ContainerItem[];
  title: string;
  reportLink?: string;
};

function Container({ className, list, title, reportLink }: Props) {
  return (
    <div className={classnames(styles.Container, className)}>
      <div className={styles.topContainer}>
        <h2 className={styles.title}>{title}</h2>
        <a className={styles.reportLink} href={reportLink}>
          Open Report
        </a>
      </div>

      <ul className={classnames(styles.list)}>
        {list.length > 0 &&
          list.map(({ text, status }: ContainerItem, i: number) => {
            return (
              <li key={i} className={styles.listItem}>
                <div className={classnames(styles.status, { [styles.complete]: status !== CONSTANTS.ERROR })}>
                  {status}
                </div>
                <span className={styles.text}>{text}</span>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default Container;
