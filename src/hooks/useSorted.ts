import { useMemo } from "react";

type typeSorted = "asc" | "desc" | null;

type DataObject = {
  [key: string]: number | string | Date;
};

const useSorted = <T extends DataObject[]>(
  array: T,
  sortableProperty: string | null,
  sortableType: typeSorted
): T => {
  const sortedArray = useMemo(() => {
    if (!sortableProperty || !sortableType || array.length === 0) return array;

    const resultArray = array.concat();

    const isStringProperty =
      typeof resultArray[0][sortableProperty] === "string";

    if (isStringProperty) {
      resultArray.sort((a, b) =>
        sortStrings(a, b, sortableProperty, sortableType)
      );
    } else {
      resultArray.sort((a, b) =>
        sortNumbers(a, b, sortableProperty, sortableType)
      );
    }

    return resultArray;
  }, [sortableProperty, sortableType, array]);

  return sortedArray as T;
};

export default useSorted;

function sortStrings(
  a: DataObject,
  b: DataObject,
  sortableProperty: string,
  typeSorted: typeSorted
) {
  const propA = a[sortableProperty].toString().toLowerCase();
  const propB = b[sortableProperty].toString().toLowerCase();

  if (typeSorted === "asc") {
    if (propA < propB) return -1;
    if (propA > propB) return 1;
  } else if (typeSorted === "desc") {
    if (propA < propB) return 1;
    if (propA > propB) return -1;
  }

  return 0;
}

function sortNumbers(
  a: DataObject,
  b: DataObject,
  sortableProperty: string,
  typeSorted: typeSorted
) {
  if (typeSorted === "asc") {
    return Number(a[sortableProperty]) - Number(b[sortableProperty]);
  }

  if (typeSorted === "desc") {
    return Number(b[sortableProperty]) - Number(a[sortableProperty]);
  }

  return 0;
}
