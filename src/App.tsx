import Table from "./components/Table/Table";
import { SearchFormForTableQuote } from "./components/SearchFormForTableQuote";
import { PaginationForTableQuotes } from "./components/PaginationForTableQuotes";
import { useAppSelector } from "./hooks/reduxHooks";
import { AuthTokenForm } from "./components/AuthTokenForm";
import { HeaderLayout } from "./components/HeaderLayout/HeaderLayout";

function App() {
  const token = useAppSelector(({ auth }) => auth.token);

  return (
    <>
      {token === "" ? (
        <AuthTokenForm />
      ) : (
        <>
          <HeaderLayout />
          <SearchFormForTableQuote />
          <Table />
          <PaginationForTableQuotes />
        </>
      )}
    </>
  );
}

export default App;
