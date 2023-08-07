import { generateArray } from "../../utils/generateArray";
import styles from "./Row.module.css";

interface RowProps {
  data: any; // исправить
  titlesColumn: string[];
  DateColumn?: string[];
}

interface RowSkeletonProps {
  countColumn: number;
}

const Row: React.FC<RowProps> & { Skeleton: React.FC<RowSkeletonProps> } = ({
  data,
  titlesColumn,
  DateColumn,
}) => {
  return (
    <tr>
      {titlesColumn.map((el) => {
        if (DateColumn?.includes(el)) {
          const date = new Date(data[el]);
          const formattedDate = date.toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: false,
            timeZone: "Europe/Moscow",
          });
          return <td key={el}>{formattedDate}</td>;
        }
        return <td key={el}>{data[el]}</td>;
      })}
    </tr>
  );
};

Row.Skeleton = ({ countColumn }) => {
  const arr = generateArray(1, countColumn);
  return (
    <tr className={styles.sceletonRow}>
      {arr.map((el) => {
        return (
          <td key={el}>
            <span></span>
          </td>
        );
      })}
    </tr>
  );
};

export default Row;
