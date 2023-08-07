import { useCallback, useEffect, useMemo } from "react";
import cl from "classnames";
import Row from "./Row";
import Pagination from "../Pagination/Pagination";
import { dataQuotes } from "../../model/model";
import { useFetching } from "../../hooks/useFetching";
import useSorted from "../../hooks/useSorted";
import useSearch from "../../hooks/useSearch";
import usePagination from "../../hooks/usePagination";
import { THeadMemo } from "./THead";
import { getQuotes } from "../../api/getQuotes";
import styles from "./Table.module.css";

interface TableProp {
  searchValue: string;
}

const tHeadData: [string, string][] = [
  ["symbol", "symbol"],
  ["sector", "sector"],
  ["lastSalePrice", "lastSalePrice"],
  ["askPrice", "askPrice"],
  ["askSize", "askSize"],
];

const Table: React.FC<TableProp> = ({ searchValue }) => {
  const [sortedData, switchSort, sortingInfo] = useSorted<dataQuotes[]>(
    [],
    "symbol",
    "asc"
  );
  const [filteredData] = useSearch(sortedData, searchValue, ["symbol"]);
  const [viewArray, switchPage, paginationInfo] = usePagination(
    0,
    10,
    filteredData
  );

  const [fetchSearchBeer, isLoading, error] = useFetching(async () => {
    await getQuotes({ token: import.meta.env.VITE_API_TOKEN }).then((res) => {
      switchSort(res, "symbol", "asc");
    });
  });

  const handleSort: React.MouseEventHandler<HTMLTableCellElement> = useCallback(
    (e) => {
      const sortableProperty = e.currentTarget.getAttribute("data-name");
      if (sortableProperty) switchSort(sortedData, sortableProperty);
    },
    [sortedData]
  );

  useEffect(() => {
    fetchSearchBeer();
  }, []);

  useEffect(() => {
    switchPage.goTo(0);
  }, [searchValue]);

  if (error != "") {
    return <span>Ошибка: {error}</span>;
  }

  return (
    <>
      <TableUI
        tHeadData={tHeadData}
        data={viewArray}
        typeSorting={sortingInfo.type}
        sortedColumn={sortingInfo.property}
        handleSort={handleSort}
        isLoading={isLoading}
      />
      <Pagination
        countPages={paginationInfo.countPages}
        activePage={paginationInfo.activePage}
        handlePrevPage={switchPage.prev}
        handleNextPage={switchPage.next}
        switchPage={switchPage.goTo}
      />
    </>
  );
};

interface TableUIProp {
  tHeadData: [string, string][];
  data: dataQuotes[];
  typeSorting: string;
  sortedColumn: string;
  handleSort?: React.MouseEventHandler<HTMLTableCellElement>;
  isLoading: boolean;
}

const TableUI: React.FC<TableUIProp> = ({
  tHeadData,
  data,
  typeSorting,
  sortedColumn,
  handleSort,
  isLoading,
}) => {
  const titleColumns = useMemo(() => {
    return tHeadData.map((el) => el[0]);
  }, [tHeadData]);

  return (
    <>
      <table className={cl(styles.root)}>
        <THeadMemo
          tHeadData={tHeadData}
          typeSorting={typeSorting}
          sortedColumn={sortedColumn}
          handleSort={handleSort}
        />
        <tbody>
          {!isLoading &&
            data.map((dataRow) => {
              return (
                <Row
                  data={dataRow}
                  titlesColumn={titleColumns}
                  key={dataRow.symbol}
                />
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default Table;
