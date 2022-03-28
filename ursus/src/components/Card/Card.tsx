import { memo } from 'react';
import classnames from 'classnames';

import styles from './Card.module.scss';

import { CardItem } from './../../types/ursusTypes';

export type Props = {
  className?: string;
  list?: CardItem[];
  title?: string;
};

function Card({ className, list, title }: Props) {
  return (
    <div className={classnames(styles.Card, className)}>
      <h2 className={styles.title}>{title}</h2>
      {list && list.length > 0 && (
        <div className={styles.listContainer}>
          {list.map((card: CardItem, i: number) => (
            <div className={styles.cardContainer} key={i}>
              <div className={styles.imageContainer}>
                <img className={styles.image} src={require(`@/assets/images/${card.imageLink}`)} alt="head" />
              </div>
              <div className={styles.textContainer}>
                <h4 className={styles.title}>
                  <b>{card.name}</b>
                </h4>
                <p className={styles.paragraph}>{card.text}</p>
              </div>
              <div className={styles.linkContainer}>
                <a className={styles.link} href={card.externLink}>
                  Link
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default memo(Card);
