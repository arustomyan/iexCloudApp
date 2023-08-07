import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import Pagination from "./shared/Pagination/Pagination";
import { goToPage, nextPage, prevPage } from "../store/slices/quotesSlice";

export const PaginationForTableQuotes = () => {
  const pagination = useAppSelector((state) => state.quotes.pagination);
  const dispatch = useAppDispatch();

  return (
    <>
      {Boolean(pagination.countPages) && (
        <Pagination
          countPages={pagination.countPages}
          activePage={pagination.currentPage}
          handlePrevPage={() => dispatch(prevPage())}
          handleNextPage={() => dispatch(nextPage())}
          switchPage={(page) => dispatch(goToPage(page))}
        />
      )}
    </>
  );
};
