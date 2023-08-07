import React from "react";
import styles from "./THead.module.css";
import cl from "classnames";
import { ArrowSortForTableQuotes } from "../ArrowSortForTableQuotes";

interface TableProps {
  tHeadData: [string, string][];
  handleSort?: React.MouseEventHandler<HTMLTableCellElement>;
}

const THead: React.FC<TableProps> = ({ tHeadData, handleSort }) => {
  return (
    <>
      <thead>
        <tr>
          {tHeadData.map((column) => {
            return (
              <th data-name={column[0]} onClick={handleSort} key={column[0]}>
                <div className={cl(styles.titleBlock)}>
                  <span>{column[1]}</span>
                  <ArrowSortForTableQuotes titleColumn={column[0]} />
                </div>
              </th>
            );
          })}
        </tr>
      </thead>
    </>
  );
};

export const THeadMemo = React.memo(THead);

export default THead;
