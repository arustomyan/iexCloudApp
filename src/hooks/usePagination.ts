import { useMemo, useState } from "react";

interface SwitchPage {
  next: () => void;
  prev: () => void;
  goTo: (page: number) => void;
}

const usePagination = (
  startPage: number,
  limitPosts: number,
  array: any[]
): [
  any[],
  SwitchPage,
  {
    activePage: number;
    countPages: number;
  }
] => {
  const [activePage, setActivePage] = useState(startPage);
  const [resultArray, setResultArray] = useState(array);

  const paginationInfo = {
    activePage: activePage + 1,
    countPages: Math.ceil(array.length / limitPosts),
  };

  const switchPage: SwitchPage = useMemo(
    () => ({
      next: () => {
        if (paginationInfo.activePage < paginationInfo.countPages) {
          setActivePage((currentPage) => currentPage + 1);
        }
      },
      prev: () => {
        if (paginationInfo.activePage > 1) {
          setActivePage((currentPage) => currentPage - 1);
        }
      },
      goTo: (page) => {
        if (page >= 0 && page <= paginationInfo.countPages) {
          setActivePage(page);
        }
      },
    }),
    [paginationInfo.activePage, paginationInfo.countPages]
  );

  useMemo(() => {
    setResultArray(
      array.slice(activePage * limitPosts, limitPosts * (activePage + 1))
    );
  }, [array, activePage]);

  return [resultArray, switchPage, paginationInfo];
};

export default usePagination;
