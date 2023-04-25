import { Inter } from "next/font/google";
import { useState } from "react";
import { searchNews } from "./api/methods";
import NewsCards from "../components/NewsCards";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [pageNum, setPageNum] = useState(10);
  const [query, setQuery] = useState("");

  const { data, isLoading } = searchNews(query, pageNum);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="z-10 w-full max-w-7xl items-center justify-between font-mono text-sm">
        <NewsCards hits={data?.hits} />
      </div>
    </main>
  );
}
