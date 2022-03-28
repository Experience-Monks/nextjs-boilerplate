import { memo } from 'react';
import classnames from 'classnames';

import styles from './SvgWrapper.module.scss';

import { PAGES } from './../../utils/constants';

import AutomatedIcon from '@/components/svgs/sidebar/automated.svg';
import ComponentIcon from '@/components/svgs/sidebar/component.svg';
import ControlIcon from '@/components/svgs/sidebar/control.svg';
import DashboardIcon from '@/components/svgs/sidebar/dashboard.svg';
import DocumentationIcon from '@/components/svgs/sidebar/documentation.svg';
import LicensesIcon from '@/components/svgs/sidebar/licenses.svg';
import QualityIcon from '@/components/svgs/sidebar/quality.svg';
import SecurityIcon from '@/components/svgs/sidebar/security.svg';
import LogIcon from '@/components/svgs/sidebar/log.svg';

export type Props = {
  className?: string;
  type: string;
};

function SvgWrapper({ className, type }: Props) {
  return (
    <div className={classnames(styles.SVGWrapper, className)}>
      <CheckType type={type} />
    </div>
  );
}

function CheckType({ type }: Props) {
  switch (type) {
    case PAGES.AUTOMATED:
      return <AutomatedIcon className={classnames(styles.svg, styles.automated)} />;
    case PAGES.COMPONENT:
      return <ComponentIcon className={classnames(styles.svg, styles.component)} />;
    case PAGES.CONTROL:
      return <ControlIcon className={classnames(styles.svg, styles.control)} />;
    case PAGES.DASHBOARD:
      return <DashboardIcon className={classnames(styles.svg, styles.dashboard)} />;
    case PAGES.DOCUMENTATION:
      return <DocumentationIcon className={classnames(styles.svg, styles.documentation)} />;
    case PAGES.LICENSES:
      return <LicensesIcon className={classnames(styles.svg, styles.licenses)} />;
    case PAGES.QUALITY:
      return <QualityIcon className={classnames(styles.svg, styles.quality)} />;
    case PAGES.SECURITY:
      return <SecurityIcon className={classnames(styles.svg, styles.security)} />;
    case PAGES.LOG:
      return <LogIcon className={classnames(styles.svg, styles.logging)} />;
    default:
      return <span className={styles.square}></span>;
  }
}

export default memo(SvgWrapper);
