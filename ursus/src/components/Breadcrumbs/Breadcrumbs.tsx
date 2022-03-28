import Link from 'next/link';
import { useRouter } from 'next/router';
import classnames from 'classnames';

import styles from './Breadcrumbs.module.scss';

import { Setting } from './../../types/ursusTypes';

import routes from './../../data/routes';

export type Props = {
  className?: string;
  setting?: Setting;
};

export type LinkWrapperProps = {
  pathname: string;
  route: string;
  children: React.ReactNode;
};

function Breadcrumbs({ className, setting }: Props) {
  const router = useRouter();

  return (
    <nav className={classnames(styles.Breadcrumbs, className)}>
      <LinkWrapper route={routes.Home.path} pathname={router.asPath}>
        <svg
          className={styles.homeIcon}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          ></path>
        </svg>
      </LinkWrapper>
      {console.log('routes', routes)}
      {router.asPath !== routes.Home.path && (
        <>
          &nbsp;&nbsp;/&nbsp;&nbsp;
          <LinkWrapper route={`${routes.Config.path}${setting?.name.toLowerCase()}/`} pathname={router.asPath}>
            {setting?.name}
          </LinkWrapper>
        </>
      )}
    </nav>
  );
}

const LinkWrapper = ({ pathname, route, children }: LinkWrapperProps) => {
  const isActive = route === pathname;

  return (
    <Link href={route} passHref>
      <h5>
        <a
          className={classnames(styles.breadcrumbsLink, styles.ActiveLink, { [styles.active]: isActive })}
          {...(isActive ? { 'aria-current': 'location' } : {})}
        >
          {children}
        </a>
      </h5>
    </Link>
  );
};

export default Breadcrumbs;
