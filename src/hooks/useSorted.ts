import { useCallback, useMemo, useState } from "react";

type typeSorted = "asc" | "desc";

type DataObject = {
  [key: string]: number | string;
};

type HookReturnValue<T> = [
  T,
  switchSortingType<T>,
  {
    property: string;
    type: string;
  }
];

type switchSortingType<T> = (
  array: T,
  sortableProperty?: string,
  sortableType?: typeSorted
) => void;

const useSorted = <T extends DataObject[]>(
  array: T,
  initialSortableProperty: string,
  initialSortableType: typeSorted
): HookReturnValue<T> => {
  const [sortedArray, setSortedArray] = useState<T>(array);
  const [saveSortableProperty, setSaveSortableProperty] = useState(
    String(initialSortableProperty)
  );
  const [savedSortableType, setSavedSortableType] =
    useState<typeSorted>(initialSortableType);

  const switchSortingType: switchSortingType<T> = useCallback(
    (array, sortableProperty = initialSortableProperty, sortableType) => {
      if (array.length === 0) return;

      const resultArray = array.concat();

      const isPrevProperty = saveSortableProperty === sortableProperty;
      if (!isPrevProperty) setSaveSortableProperty(sortableProperty);

      if (sortableType === undefined) {
        const typeSorted = savedSortableType === "asc" ? "desc" : "asc";
        setSavedSortableType(typeSorted);
      } else {
        setSavedSortableType(sortableType);
      }

      const isStringProperty =
        typeof resultArray[0][sortableProperty] === "string";

      if (isStringProperty) {
        resultArray.sort((a, b) =>
          sortStrings(a, b, sortableProperty, savedSortableType)
        );
      } else {
        resultArray.sort((a, b) =>
          sortNumbers(a, b, sortableProperty, savedSortableType)
        );
      }

      setSortedArray(resultArray as T);
    },
    [savedSortableType, sortedArray]
  );

  useMemo(() => {
    switchSortingType(array, initialSortableProperty, "asc");
  }, [array]);

  const sortingInfo = {
    property: saveSortableProperty,
    type: savedSortableType,
  };

  return [sortedArray, switchSortingType, sortingInfo];
};

export default useSorted;

function sortStrings(
  a: {
    [key: string]: string | number;
  },
  b: {
    [key: string]: string | number;
  },
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
  a: {
    [key: string]: string | number;
  },
  b: {
    [key: string]: string | number;
  },
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
