import classnames from 'classnames';

import styles from './PlainList.module.scss';

import { ListItem } from './../../types/ursusTypes';

export type Props = {
  className?: string;
  title: string;
  list: ListItem[];
};

function PlainList({ className, title, list }: Props) {
  return (
    <div className={classnames(styles.PlainList, className)}>
      <h2 className={styles.title}>{title}</h2>
      <ul className={classnames(styles.list)}>
        {list.length > 0 &&
          list.map(({ name, link, text }: ListItem, i: number) => {
            return (
              <li key={i} className={styles.listItem}>
                <span className={styles.itemKey}>{name}: </span>
                {Boolean(link) ? (
                  <a href={link} className={styles.itemValueLink}>
                    {link}
                  </a>
                ) : (
                  <span className={styles.itemValue}>{text}</span>
                )}
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default PlainList;
