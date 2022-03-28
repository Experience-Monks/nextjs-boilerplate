import classnames from 'classnames';

import styles from './List.module.scss';

import { ListItem } from './../../types/ursusTypes';

export type Props = {
  className?: string;
  title: string;
  list: ListItem[];
  isBlockItem: boolean;
};

function List({ className, title, list, isBlockItem }: Props) {
  return (
    <div className={classnames(styles.List, className)}>
      <h2 className={styles.title}>{title}</h2>
      <ul className={classnames(styles.listItem, isBlockItem ? styles.listItemBlock : null)}>
        {list.length > 0 &&
          list.map(({ name, link }, index: number) => {
            return (
              <li key={index} className={styles.link}>
                <a href={link}>{name}</a>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default List;
