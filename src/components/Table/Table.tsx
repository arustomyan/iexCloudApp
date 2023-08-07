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
import { generateArray } from "../../utils/generateArray";

interface TableProp {}

const tHeadData: [string, string][] = [
  ["symbol", "symbol"],
  ["sector", "sector"],
  ["lastSalePrice", "lastSalePrice"],
  ["askPrice", "askPrice"],
  ["lastSaleTime", "lastSaleTime"],
  ["lastUpdated", "lastUpdated"],
];

const Table: React.FC<TableProp> = () => {
  const dispatch = useAppDispatch();
  const quotes = useAppSelector(({ quotes }) => quotes.data);
  const { isLoading } = useAppSelector(({ quotes }) => quotes.status);
  const token = useAppSelector(({ auth }) => auth.token);
  const { column, direction } = useAppSelector(({ quotes }) => quotes.sorted);
  const searchValue = useAppSelector(({ quotes }) => quotes.searchValue);
  const filteredData = useSearch(quotes, searchValue, ["symbol"]);
  const sortedData = useSorted<dataQuotes[]>(filteredData, column, direction);
  const viewData = usePagination(sortedData);

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
    dispatch(fetchQuotes({ token }));
  }, [token]);

  return (
    <>
      <TableUI
        tHeadData={tHeadData}
        data={viewData}
        handleSort={handleSort}
        isLoading={isLoading}
      />
    </>
  );
};

interface TableUIProp {
  tHeadData: [string, string][];
  data: dataQuotes[];
  handleSort?: React.MouseEventHandler<HTMLTableCellElement>;
  isLoading: boolean;
}

const TableUI: React.FC<TableUIProp> = ({
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
