import styles from "./ArrowSort.module.css";
import cl from "classnames";

interface ArrowSortProps {
  sortedType: string;
  isActive?: boolean;
}

const ArrowSort: React.FC<ArrowSortProps> = ({ sortedType, isActive }) => {
  let mod = "";
  if (!isActive) {
    mod = "";
    setTimeout(() => (mod = styles._notActive), 250);
  } else {
    mod = styles[`_${sortedType}`];
  }

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="7"
        viewBox="0 0 12 7"
        fill="none"
        className={cl(styles.root, mod)}
      >
        <line
          x1="0.353553"
          y1="0.646447"
          x2="6.18011"
          y2="6.47301"
          stroke="#FCFCFC"
        />
        <line
          x1="5.64645"
          y1="6.30331"
          x2="11.3033"
          y2="0.646453"
          stroke="white"
        />
      </svg>
    </>
  );
};

export default ArrowSort;
