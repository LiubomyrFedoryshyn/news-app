import { useState } from "react";
import { searchNews } from "./api/methods";
import NewsCards from "../components/NewsCards";
import { Pagination } from "@/components/Pagination";
import { Loader } from "@/components/Loader";
import { NEWS_API_LIMIT, NEWS_API_INTERVAL } from "@/utils/constants";

export default function Home() {
  const [pageNum, setPageNum] = useState(10);
  const [page, setPage] = useState<number | string>(1);
  const [siblingCount, setSiblingCount] = useState(2);
  const [query, setQuery] = useState("");
  const [actualPage, setActualPage] = useState<number>(0);

  const { data, isLoading } = searchNews(
    query,
    pageNum,
    actualPage,
    NEWS_API_INTERVAL
  );

  return isLoading ? (
    <Loader />
  ) : (
    <div className="z-10 w-full max-w-7xl items-center justify-between font-mono text-sm">
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
