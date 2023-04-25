import useSWR from "swr";
import { fetcher } from "./fetcher";

export const Request = (url: string | null) => {
  const { data, error, isLoading } = useSWR(url ? url : null, fetcher);
  if (error) {
    throw { error };
  }
  return { data, isLoading };
};
