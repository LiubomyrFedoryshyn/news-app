import { useState } from "react";
import { searchNews } from "./api/methods";
import NewsCards from "../components/NewsCards";

export default function Home() {
  const [pageNum, setPageNum] = useState(10);
  const [query, setQuery] = useState("");

  const { data, isLoading } = searchNews(query, pageNum);

  return (
    <div className="z-10 w-full max-w-7xl items-center justify-between font-mono text-sm">
      {!isLoading && <NewsCards hits={data?.hits} />}
    </div>
  );
}
