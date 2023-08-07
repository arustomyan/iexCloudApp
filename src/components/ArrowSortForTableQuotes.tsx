import { useAppSelector } from "../hooks/reduxHooks";
import ArrowSort from "./ArrowSort/ArrowSort";
import { FC } from "react";

export const ArrowSortForTableQuotes: FC<{ titleColumn: string }> = ({
  titleColumn,
}) => {
  const { direction, column } = useAppSelector(({ quotes }) => quotes.sorted);
  return <ArrowSort sortedType={direction} isActive={column === titleColumn} />;
};
