import { Request } from "./request";

export const searchNews = (
  query: string,
  pagNum: number,
  page: number,
  repeatInterval?: number
) => {
  return Request(
    `https://hn.algolia.com/api/v1/search?query=${query}&hitsPerPage=${pagNum}&page=${page}`,
    repeatInterval
  );
};

export const getDetails = (id?: string) => {
  return Request(id ? `http://hn.algolia.com/api/v1/items/${id}` : null);
};
