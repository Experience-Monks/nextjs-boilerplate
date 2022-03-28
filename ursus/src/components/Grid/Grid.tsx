import { useEffect, useState } from 'react';
import classnames from 'classnames';

import styles from './Grid.module.scss';

import TableLogo from '../../components/svgs/table.svg';
import { licenseDetails, LicenseTableChecklist } from '../../types/ursusTypes';
import { CONSTANTS } from '../../utils/constants';

export type Props = {
  className?: string;
  checklist?: LicenseTableChecklist[];
};

const Grid = ({ className, checklist }: Props) => {
  const [rowToShow, setRowToShow] = useState<LicenseTableChecklist[]>([]);
  const [next, setNext] = useState(6);
  const nextNumberOfRows = 6;

  let numberOfLicense = 0;
  if (!!checklist) {
    numberOfLicense = checklist.length;
  }

  function sliceFiveRow(start: number, end: number) {
    let showAllRows = [];
    if (!checklist) return;
    const slicedRow = checklist.slice(start, end);
    showAllRows = [...rowToShow, ...slicedRow];
    setRowToShow(showAllRows);
  }

  useEffect(() => {
    sliceFiveRow(0, nextNumberOfRows);
  }, []);

  const handleLoadMore = () => {
    sliceFiveRow(next, next + nextNumberOfRows);
    setNext(next + nextNumberOfRows);
  };

  return (
    <div className={classnames(styles.Grid, className)}>
      {rowToShow && (
        <>
          <div className={styles.countWrapper}>
            <TableLogo className={styles.countLogo} />
            <h5 className={styles.count}>
              {numberOfLicense} licenses {`issue${numberOfLicense > 1 ? `s` : ``}`} found
            </h5>
          </div>
          <table className={styles.table}>
            <thead>
              <tr className={styles.row}>
                <th className={styles.headerItem}>PACKAGE</th>
                <th className={styles.headerItem}>VERSION </th>
                <th className={styles.headerItem}>LICENSE(S)</th>
                <th className={styles.headerItem}>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {rowToShow.length > 0 &&
                rowToShow.map((item, index) => {
                  if (!!item) {
                    const packageName = Object.keys(item)[0];
                    const licenseDetails: licenseDetails = Object.values(item)[0];
                    const status = licenseDetails.status;
                    return (
                      <tr className={styles.row} key={index}>
                        <td className={styles.rowItem}>{packageName}</td>
                        <td className={styles.rowItem}>{licenseDetails.version}</td>
                        <td className={styles.rowItem}>{licenseDetails.license}</td>
                        <td className={styles.rowItem}>
                          <p
                            className={classnames(styles.status, {
                              [styles.complete]: status === CONSTANTS.COMPLETE,
                              [styles.needsReview]: status === CONSTANTS.NEEDS_REVIEW
                            })}
                          >
                            {status}
                          </p>
                        </td>
                      </tr>
                    );
                  }
                  return null;
                })}
            </tbody>
          </table>
          <button className={styles.loadMorebutton} onClick={() => handleLoadMore()}>
            Load More
          </button>
        </>
      )}
    </div>
  );
};

export default Grid;
