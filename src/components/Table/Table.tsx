import { useCallback, useEffect, useMemo } from "react";
import cl from "classnames";
import { dataQuotes } from "../../model/model";
import useSorted from "../../hooks/useSorted";
import useSearch from "../../hooks/useSearch";
import { THeadMemo } from "./THead";
import styles from "./Table.module.css";
import {
  fetchQuotes,
  setCountPages,
  switchSorting,
} from "../../store/slices/quotesSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import usePagination from "../../hooks/usePagination";
import Row from "./Row";

interface TableProp {}

const tHeadData: [string, string][] = [
  ["symbol", "symbol"],
  ["sector", "sector"],
  ["lastSalePrice", "lastSalePrice"],
  ["askPrice", "askPrice"],
  ["askSize", "askSize"],
];

const Table: React.FC<TableProp> = () => {
  const dispatch = useAppDispatch();

  const quotes = useAppSelector(({ quotes }) => quotes.data);
  const { column, direction } = useAppSelector(({ quotes }) => quotes.sorted);
  const searchValue = useAppSelector(({ quotes }) => quotes.searchValue);

  const sortedData = useSorted<dataQuotes[]>(quotes, column, direction);
  const filteredData = useSearch(sortedData, searchValue, ["symbol"]);
  const viewData = usePagination(filteredData);

  // Оставляю эту функцию здесь, потому что переключение сортировки вызовет ререндер всей таблицы
  const handleSort: React.MouseEventHandler<HTMLTableCellElement> = useCallback(
    (e) => {
      const sortableProperty = e.currentTarget.getAttribute("data-name");
      if (sortableProperty) {
        dispatch(switchSorting({ column: sortableProperty }));
      }
    },
    []
  );

  useEffect(() => {
    dispatch(setCountPages(filteredData.length));
  }, [filteredData.length]);

  useEffect(() => {
    dispatch(fetchQuotes({ token: import.meta.env.VITE_API_TOKEN }));
  }, []);

  return (
    <>
      <TableUI
        tHeadData={tHeadData}
        data={viewData}
        typeSorting={"asc"}
        sortedColumn={"sortingInfo.property"}
        handleSort={handleSort}
        isLoading={false}
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
