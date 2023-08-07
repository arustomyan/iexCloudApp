import Table from "./components/Table/Table";
import { SearchFormForTableQuote } from "./components/SearchFormForTableQuote";
import { PaginationForTableQuotes } from "./components/PaginationForTableQuotes";

function App() {
  return (
    <>
      <SearchFormForTableQuote />
      <Table />
      <PaginationForTableQuotes />
    </>
  );
}

export default App;
