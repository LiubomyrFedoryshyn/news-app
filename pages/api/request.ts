import useSWR from "swr";
import { fetcher } from "./fetcher";

export const Request = (url: string | null, repeatInterval?: number) => {
  const { data, error, isLoading } = useSWR(url ? url : null, fetcher, {
    refreshInterval: repeatInterval || 0,
  });
  if (error) {
    throw { error };
  }
  return { data, isLoading };
};
