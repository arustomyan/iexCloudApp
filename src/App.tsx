import { useCallback, useState } from "react";
import { SearchForm } from "./components/Search/SearchForm";
import Table from "./components/Table/Table";

function App() {
  const [searchValue, setSearchValue] = useState("");

  const handleSubmit = useCallback((e: string) => {
    setSearchValue(e);
  }, []);

  return (
    <>
      <SearchForm onSubmit={handleSubmit} />
      <Table searchValue={searchValue} />
    </>
  );
}

export default App;
