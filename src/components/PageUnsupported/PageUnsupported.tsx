import { FC, memo } from 'react';
import classNames from 'classnames';

import css from './PageUnsupported.module.scss';

import { PageProps } from '@/data/types';

export interface PageUnsupportedProps extends PageProps {
  className?: string;
}

const PageUnsupported: FC<PageUnsupportedProps> = ({ className }) => {
  return (
    <main className={classNames('PageUnsupported', css.root, className)}>
      <h1 className={css.title}>Your browser is not supported.</h1>
    </main>
  );
};

export default memo(PageUnsupported);
