import { Request } from "./request";

export const searchNews = (query: string, pagNum: number) => {
  return Request(
    `http://hn.algolia.com/api/v1/search?query=${query}&hitsPerPage=${pagNum}`
  );
};
