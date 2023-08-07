import { SearchFormForTableQuote } from "./components/SearchFormForTableQuote";
import { PaginationForTableQuotes } from "./components/PaginationForTableQuotes";
import { useAppSelector } from "./hooks/reduxHooks";
import { AuthTokenForm } from "./components/AuthTokenForm";
import { HeaderLayout } from "./components/HeaderLayout/HeaderLayout";
import TableQuotes from "./components/TableQuotes";

function App() {
  const token = useAppSelector(({ auth }) => auth.token);
  const isError = useAppSelector(({ quotes }) => quotes.status.isError);

  return (
    <>
      {token === "" ? (
        <AuthTokenForm />
      ) : (
        <>
          <HeaderLayout />
          {isError === null ? (
            <>
              <SearchFormForTableQuote />
              <TableQuotes />
              <PaginationForTableQuotes />
            </>
          ) : (
            <span>{isError}</span>
          )}
        </>
      )}
    </>
  );
}

export default App;
