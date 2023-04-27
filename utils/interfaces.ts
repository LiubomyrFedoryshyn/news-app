export interface IUsePagination {
  results: number;
  pageNum: number;
  page: number | string;
  siblingCount: number;
}

export interface ILocNews {
  id: string;
  type: string;
}

export interface IHits {
  objectID: string;
  title: string;
  url: string;
  points: number;
  author: string;
  created_at: string;
  num_comments: number;
}

export interface INewsCard {
  hits: Array<IHits>;
}

interface INews {
  objectID: string;
  title: string;
  author: string;
  points: number;
  created_at: string;
}

export interface IMain {
  news: INews;
  objectID?: string;
}
