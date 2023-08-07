import { useState } from "react";

type useFetching = (
  callback: (...args: any) => any
) => [fetching, boolean, string];

type fetching = (...args: any) => void;

export const useFetching: useFetching = (callback) => {
  const [error, setError] = useState<string>("");

  const [isLoading, setIsLoading] = useState(true);

  const fetching: fetching = async (...args) => {
    try {
      setIsLoading(true);
      await callback(...args);
    } catch (e: any) {
      console.error(e);
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return [fetching, isLoading, error];
};
