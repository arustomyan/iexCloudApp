import { useAppSelector } from "./reduxHooks";

const usePagination = (array: any[]): any[] => {
  const { limit, currentPage } = useAppSelector(
    ({ quotes }) => quotes.pagination
  );

  return array.slice(currentPage * limit, limit * (currentPage + 1));
};

export default usePagination;
