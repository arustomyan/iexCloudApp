import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import usePagination from "../hooks/usePagination";
import useSearch from "../hooks/useSearch";
import useSorted from "../hooks/useSorted";
import { dataQuotes } from "../model/model";
import {
  switchSorting,
  setCountPages,
  fetchQuotes,
} from "../store/slices/quotesSlice";
import Table from "./Table/Table";

interface TableQuotesProp {}

// Массив кортежей определяющий колонки таблицы
const tHeadData: [string, string][] = [
  // Каждый элемент массива представляет собой кортеж с двумя элементами:
  // 1. Ключ, который будет использоваться как идентификатор колонки в данных
  // 2. Заголовок колонки, который будет отображаться в таблице
  ["symbol", "symbol"],
  ["sector", "sector"],
  ["lastSalePrice", "lastSalePrice"],
  ["askPrice", "askPrice"],
  ["lastSaleTime", "lastSaleTime"],
  ["lastUpdated", "lastUpdated"],
];

const TableQuotes: React.FC<TableQuotesProp> = () => {
  const dispatch = useAppDispatch();
  const quotes = useAppSelector(({ quotes }) => quotes.data);
  const { isLoading } = useAppSelector(({ quotes }) => quotes.status);
  const token = useAppSelector(({ auth }) => auth.token);
  const { column, direction } = useAppSelector(({ quotes }) => quotes.sorted);
  const searchValue = useAppSelector(({ quotes }) => quotes.searchValue);

  // Поиск searchValue в колонке symbol
  const filteredData = useSearch(quotes, searchValue, ["symbol"]);

  // Сортировка данных по выбранной колонке и направлению
  const sortedData = useSorted<dataQuotes[]>(filteredData, column, direction);

  // Постраничное разделение данных
  const viewData = usePagination(sortedData);

  // Обработчик сортировки данных при клике на заголовок колонки
  const handleSort: React.MouseEventHandler<HTMLTableCellElement> = useCallback(
    (e) => {
      const sortableProperty = e.currentTarget.getAttribute("data-name");
      if (sortableProperty) {
        dispatch(switchSorting({ column: sortableProperty }));
      }
    },
    []
  );

  // Обновление количества страниц после изменения отфильтрованных данных
  useEffect(() => {
    dispatch(setCountPages(filteredData.length));
  }, [filteredData.length]);

  useEffect(() => {
    dispatch(fetchQuotes({ token }));
  }, [token]);

  return (
    <>
      <Table
        tHeadData={tHeadData}
        data={viewData}
        handleSort={handleSort}
        isLoading={isLoading}
      />
    </>
  );
};

export default TableQuotes;
