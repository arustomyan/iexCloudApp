import { useAppDispatch } from "../hooks/reduxHooks";
import { setSearchValue } from "../store/slices/quotesSlice";
import { SearchForm } from "./shared/Search/SearchForm";

export const SearchFormForTableQuote = () => {
  const dispatch = useAppDispatch();
  const handleSubmit = (value: string) => {
    dispatch(setSearchValue(value));
  };

  return (
    <SearchForm onSubmit={handleSubmit} placeholder="search by symbol..." />
  );
};
