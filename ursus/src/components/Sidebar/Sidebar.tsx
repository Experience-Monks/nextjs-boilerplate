import { memo } from 'react';
import Link from 'next/link';
import classnames from 'classnames';

import styles from './Sidebar.module.scss';

import SvgWrapper from './../../components/SvgWrapper/SvgWrapper';

import { Categories, General } from './../../types/ursusTypes';

import HelpIcon from '@/components/svgs/help.svg';
import Ursuslogo from '@/components/svgs/ursus.svg';
import routes from './../../data/routes';

export type Props = {
  className?: string;
  general: General;
  categories: Categories;
};

function Sidebar({ className, general, categories }: Props) {
  return (
    <div className={classnames(styles.Sidebar, className)}>
      <div className={styles.ursus}>
        <Link href={`/`}>
          <a className={styles.logo}>
            <Ursuslogo className={styles.ursusLogo} />
          </a>
        </Link>
        <div className={styles.name}>Ursus</div>
      </div>
      <div className={styles.projectName}>{general['project-name']}</div>
      <div className={styles.list}>
        {Object.entries(categories).map(([link, config], index) => {
          if (!!config) {
            return (
              <Link href={`${routes.Config.path}${link}/`} key={index}>
                <a className={styles.link}>
                  {/* Below is placeholder for future checkbox implementation */}
                  {/* <span className={classnames(styles.checkbox, styles.active)}></span> */}
                  {<SvgWrapper type={config.setting.name} />}
                  <h5 className={styles.listItem}>{config.setting.name}</h5>
                </a>
              </Link>
            );
          } else {
            return null;
          }
        })}
      </div>

      <div className={styles.sidebarFooter}>
        <div className={styles.help}>
          <HelpIcon className={styles.helpIcon} />
          <a className={styles.helpLink} href={general['ursus-help']}>
            How does Ursus work?
          </a>
        </div>
        <h4 className={styles.version}>Version: {general.version}</h4>
      </div>
    </div>
  );
}

export default memo(Sidebar);
