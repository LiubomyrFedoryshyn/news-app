import { Request } from "./request";

export const searchNews = (query: string, pagNum: number) => {
  return Request(
    `http://hn.algolia.com/api/v1/search?query=${query}&hitsPerPage=${pagNum}`
  );
};

export const getDetails = (id?: string) => {
  return Request(id ? `http://hn.algolia.com/api/v1/items/${id}` : null);
};
