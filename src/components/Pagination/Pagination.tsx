import { FC, useEffect, useState } from "react";
import styles from "./Pagination.module.css";
import cl from "classnames";

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
  const [arrayPages, setArrayPages] = useState([0]);

  useEffect(() => {
    const array = [];
    for (let i = 1; i <= countPages; i++) {
      array.push(i);
    }

    setArrayPages(array);
  }, [countPages]);

  const handleGoToPage = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const page = Number(e.currentTarget.getAttribute("data-page"));
    console.log(e.currentTarget.getAttribute("data-page"));
    page && switchPage(page - 1);
  };

  return (
    <div className={cl(styles.root)}>
      <button
        className={cl(styles.button, {
          [styles.button_notActive]: activePage === 1,
        })}
        onClick={handlePrevPage}
      >
        Назад
      </button>
      <div className={cl(styles.list)}>
        {arrayPages.map((i) => {
          return (
            <button
              className={cl(styles.item, {
                [styles.item_active]: i === activePage,
              })}
              key={i}
              data-page={i}
              onClick={handleGoToPage}
              type="button"
            >
              {i}
            </button>
          );
        })}
      </div>
      <button
        onClick={handleNextPage}
        className={cl(styles.button, {
          [styles.button_notActive]: activePage === countPages,
        })}
      >
        Далее
      </button>
    </div>
  );
};

export default Pagination;
