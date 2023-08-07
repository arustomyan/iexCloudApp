import { FC, useEffect, useRef, useState } from "react";
import styles from "./Pagination.module.css";
import cl from "classnames";
import { Button } from "../Button/Button";
import { generateArray } from "../../../utils/generateArray";

interface PaginationProp {
  countPages: number;
  activePage: number;
  handlePrevPage: () => void;
  handleNextPage: () => void;
  switchPage: (page: number) => void;
}
const Pagination: FC<PaginationProp> = ({
  countPages,
  activePage,
  handlePrevPage,
  handleNextPage,
  switchPage,
}) => {
  const [arrayPages, setArrayPages] = useState<(number | string)[]>([0]);
  const uniqueKeyCounterRef = useRef(0);

  useEffect(() => {
    const getPagesArray = () => {
      if (countPages > 11) {
        if (activePage <= 5) {
          return [...generateArray(0, 7), "...", countPages];
        } else if (activePage + 4 >= countPages) {
          return [1, "...", ...generateArray(countPages - 6, countPages)];
        } else {
          return [
            0,
            "...",
            ...generateArray(activePage - 2, activePage + 2),
            "...",
            countPages,
          ];
        }
      } else {
        return generateArray(0, countPages);
      }
    };

    setArrayPages(getPagesArray());
  }, [countPages, activePage]);

  const handleGoToPage = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const page = Number(e.currentTarget.getAttribute("data-page"));
    typeof page === "number" && switchPage(page);
  };

  const getUniqueKey = () => {
    uniqueKeyCounterRef.current += 1;
    return uniqueKeyCounterRef.current.toString() + "key";
  };

  return (
    <div className={cl(styles.root)}>
      <Button
        className={cl(styles.button, {
          [styles.button_notActive]: activePage === 0,
        })}
        onClick={handlePrevPage}
      >
        Назад
      </Button>
      <div className={cl(styles.list)}>
        {arrayPages.map((page: string | number) => {
          if (typeof page === "number") {
            return (
              <button
                className={cl(styles.item, {
                  [styles.item_active]: page === activePage,
                })}
                key={page}
                data-page={page}
                onClick={handleGoToPage}
                type="button"
              >
                {page + 1}
              </button>
            );
          }
          return <span key={getUniqueKey()}>...</span>;
        })}
      </div>
      <Button
        onClick={handleNextPage}
        className={cl(styles.button, {
          [styles.button_notActive]: activePage === countPages,
        })}
      >
        Далее
      </Button>
    </div>
  );
};

export default Pagination;
