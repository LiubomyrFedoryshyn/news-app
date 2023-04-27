import { useState } from "react";
import dynamic from "next/dynamic";
import { searchNews } from "./api/methods";
import { Pagination } from "@/components/Pagination";
import { NEWS_API_LIMIT, NEWS_API_INTERVAL } from "@/utils/constants";
import { INewsCard } from "@/utils/interfaces";

const Loader = dynamic<{}>(() =>
  import("../components/Loader").then((mod) => mod.Loader)
);
const NewsCards = dynamic<INewsCard>(() =>
  import("../components/NewsCards").then((mod) => mod.default)
);

export default function Home() {
  const [pageNum, setPageNum] = useState<number>(10); // for expanded pagination in future
  const [page, setPage] = useState<number | string>(1);
  const [siblingCount, setSiblingCount] = useState<number>(1); // for expanded pagination in future
  const [query, setQuery] = useState<string>(""); // for search implementation in future
  const [actualPage, setActualPage] = useState<number>(0); // actual page calculation because API page lists starts with "0"

  const { data, isLoading } = searchNews(
    query,
    pageNum,
    actualPage,
    NEWS_API_INTERVAL
  );

  return isLoading ? (
    <Loader />
  ) : (
    <div className="z-10 w-full max-w-7xl items-center justify-between font-mono">
      <NewsCards hits={data?.hits} />
      <Pagination
        className="pagination-bar"
        page={page}
        results={NEWS_API_LIMIT}
        pageNum={pageNum}
        onPageChange={(page: number | string) => {
          setPage(page);
          setActualPage(Number(page) - 1);
        }}
        siblingCount={siblingCount}
      />
    </div>
  );
}
