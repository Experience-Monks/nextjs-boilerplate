import { memo, useEffect, useRef } from 'react';
import classnames from 'classnames';
import gsap from 'gsap';

import styles from './index.module.scss';

import Head from '@/components/Head/Head';

type Props = {
  className: string;
};

function Home({ className }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const timeline = gsap
      .timeline()
      .fadeIn(titleRef.current, 0.2)
      .fadeIn(descriptionRef.current, 0.4)
      .fadeIn(listRef.current?.childNodes, { stagger: 0.1 }, 0.6);

    return () => {
      timeline?.kill();
    };
  }, []);

  return (
    <main className={classnames(styles.Home, className)} ref={containerRef}>
      <Head />
      <section className={styles.hero}>
        <h1 className={styles.title} ref={titleRef}>
          Welcome to Jam3!
        </h1>
        <h2 className={styles.description} ref={descriptionRef}>
          To get started, edit <code>pages/index.js</code> and save to reload.
        </h2>
        <ul className={styles.row} ref={listRef}>
          <li>
            <a
              href="https://github.com/Jam3?q=&type=source"
              className={styles.card}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3>Visit out GitHub</h3>
              <p>See our contributions to Open Source community</p>
            </a>
          </li>
          <li>
            <a href="https://jam3.dev" className={styles.card} target="_blank" rel="noopener noreferrer">
              <h3>Jam3.dev</h3>
              <p>Learn more about Jam3.dev</p>
            </a>
          </li>
          <li>
            <a href="/ursus" className={styles.card} target="_blank" rel="noopener noreferrer">
              <h3>Ursus</h3>
              <p>See project details</p>
            </a>
          </li>
        </ul>
      </section>
    </main>
  );
}

export default memo(Home);
