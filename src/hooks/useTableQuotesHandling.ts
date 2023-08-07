import { dataQuotes } from "../model/model";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import useSearch from "./useSearch";
import useSorted from "./useSorted";

const useTableQuotesHandling = () => {
  // Получаю данные из стора
  const quotes = useAppSelector(({ quotes }) => quotes.data);
  const { column, direction } = useAppSelector(({ quotes }) => quotes.sorted);
  const searchValue = useAppSelector(({ quotes }) => quotes.searchValue);

  const sortedData = useSorted<dataQuotes[]>(quotes, column, direction);
  const filteredData = useSearch(sortedData, searchValue, ["symbol"]);

  return filteredData;
};

export default useSorted;
