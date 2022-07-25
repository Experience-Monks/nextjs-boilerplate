import { memo, useEffect, useRef } from 'react';
import classnames from 'classnames';
import gsap from 'gsap';

import styles from './index.module.scss';

import Head from '@/components/Head/Head';

import sanitizer from '@/utils/sanitizer';

import { client, PageIdType } from '@/client';

type Props = {
  className: string;
};

function Home({ className }: Props) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const { usePosts, usePage } = client;
  const posts = usePosts({
    first: 6
  });
  const page = usePage({
    id: '/',
    idType: PageIdType.URI
  });

  if (page?.blocksJSON) {
    console.log(JSON.parse(page.blocksJSON));
  }

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
    <main className={classnames(styles.Home, className)}>
      <Head />

      <section className={styles.hero}>
        <div className="posts">
          <h2>Recent Posts</h2>
          <ul>
            {posts?.nodes?.map((post) => (
              <li key={post?.id}>
                <h2>{post?.title()}</h2>
                <p>{post?.content()}</p>
              </li>
            ))}
          </ul>
        </div>

        <h1 className={styles.title} ref={titleRef}>
          {page?.title()}
        </h1>
        <div dangerouslySetInnerHTML={{ __html: sanitizer(page?.content()!) }} />
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
        </ul>
      </section>
    </main>
  );
}

export default memo(Home);
