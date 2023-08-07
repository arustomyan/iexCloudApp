interface RowProps {
  data: any; // исправить
  titlesColumn: string[];
  DateColumn?: string[];
}

const Row: React.FC<RowProps> = ({ data, titlesColumn, DateColumn }) => {
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

export default Row;
