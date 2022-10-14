import { FC, memo, useEffect, useRef } from 'react';
import classNames from 'classnames';
import gsap from 'gsap';

import css from './PageAbout.module.scss';

import { PageProps } from '@/data/types';

export interface PageAboutProps extends PageProps {
  className?: string;
}

const PageAbout: FC<PageAboutProps> = ({ className }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const timeline = gsap.timeline().fadeIn(titleRef.current, 0.2);
    return () => {
      timeline.kill();
    };
  }, []);

  return (
    <main className={classNames('PageAbout', css.root, className)}>
      <h1 className={css.title} ref={titleRef}>
        About Page
      </h1>
    </main>
  );
};

export default memo(PageAbout);
