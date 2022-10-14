import { FC, memo } from 'react';
import classNames from 'classnames';

import css from './PageNotFound.module.scss';

import { PageProps } from '@/data/types';

export interface PageNotFoundProps extends PageProps {
  className?: string;
}

const PageNotFound: FC<PageNotFoundProps> = ({ className }) => {
  return (
    <main className={classNames('PageNotFound', css.root, className)}>
      <h1 className={css.title}>Page Not Found</h1>
    </main>
  );
};

export default memo(PageNotFound);
