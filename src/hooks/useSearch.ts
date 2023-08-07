import { useMemo } from "react";

const useSearch = (
  array: any[],
  value: string,
  arrayColumns: string[]
): [any[]] => {
  const filteredArray = useMemo(() => {
    return array.filter((item) => {
      for (let i = 0; i < arrayColumns.length; i++) {
        const columnValue = item[arrayColumns[i]].toString().toLowerCase();
        if (columnValue.includes(value.toLowerCase())) return true;
      }
      return false;
    });
  }, [array, value]);

  return [filteredArray];
};

export default useSearch;
