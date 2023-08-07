import { useMemo } from "react";
import cl from "classnames";
import { dataQuotes } from "../../model/model";
import { THeadMemo } from "./THead";
import styles from "./Table.module.css";
import Row from "./Row";
import { generateArray } from "../../utils/generateArray";

interface TableProp {
  tHeadData: [string, string][];
  data: dataQuotes[];
  handleSort?: React.MouseEventHandler<HTMLTableCellElement>;
  isLoading: boolean;
}

const Table: React.FC<TableProp> = ({
  tHeadData,
  data,
  handleSort,
  isLoading,
}) => {
  const titleColumns = useMemo(() => {
    return tHeadData.map((el) => el[0]);
  }, [tHeadData]);

  return (
    <>
      <table className={cl(styles.root)}>
        <THeadMemo tHeadData={tHeadData} handleSort={handleSort} />
        <tbody>
          {isLoading
            ? generateArray(1, 10).map((el) => {
                return <Row.Skeleton countColumn={tHeadData.length} key={el} />;
              })
            : data.map((dataRow) => {
                return (
                  <Row
                    data={dataRow}
                    titlesColumn={titleColumns}
                    key={dataRow.symbol}
                    DateColumn={["lastSaleTime", "lastUpdated"]}
                  />
                );
              })}
        </tbody>
      </table>
    </>
  );
};

export default Table;
