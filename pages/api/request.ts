import useSWR from "swr";
import { fetcher } from "./fetcher";

export const Request = (url: string) => {
  const { data, error, isLoading } = useSWR(url, fetcher);
  if (error) {
    throw { error };
  }
  return { data, isLoading };
};
