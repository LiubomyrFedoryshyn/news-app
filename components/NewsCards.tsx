import { FC, useEffect, useState } from "react";
import Link from "next/link";
import moment from "moment";
import classNames from "classnames";
import { POINTS_URL, AUTHOR_URL } from "@/utils/constants";
import { Rate } from "./Rate";
import { ILocNews } from "@/utils/interfaces";

interface IHits {
  objectID: string;
  title: string;
  url: string;
  points: number;
  author: string;
  created_at: string;
  num_comments: number;
}

interface INewsCard {
  hits: Array<IHits>;
}

const NewsCards: FC<INewsCard> = (props: INewsCard) => {
  const { hits } = props;
  const [activeNews, setActiveNews] = useState<ILocNews[]>([]); // current active news

  useEffect(() => {
    const locNews = JSON.parse(localStorage.getItem("locNews") || "[]"); // get and set items from localstorage
    setActiveNews(locNews);
  }, []);

  return (
    <>
      {hits?.map((el: IHits) => {
        const {
          objectID,
          title,
          url,
          points,
          author,
          created_at,
          num_comments,
        } = el;
        return (
          <div className="mb-2" key={objectID}>
            <div>
              <h6
                className={classNames({
                  "text-red-600": !title,
                  "cursor-pointer": title,
                })}
              >
                <Link href={title ? `/news/${objectID}` : "#"}>
                  {title || "This article has been removed"}{" "}
                </Link>

                {url && (
                  <a
                    target="_blanc"
                    className="text-gray-600 hover:underline text-sm mr-2 break-all"
                    href={url}
                  >
                    ({url})
                  </a>
                )}
                <Rate
                  news={
                    activeNews &&
                    activeNews.find((el: ILocNews) => el?.id === objectID)
                  }
                />
              </h6>
              <p>
                <a
                  target="_blanc"
                  className="text-gray-600 hover:underline text-xs"
                  href={POINTS_URL + objectID}
                >
                  {points} |{" "}
                </a>
                <a
                  target="_blanc"
                  className="text-gray-600 hover:underline text-xs "
                  href={AUTHOR_URL + author}
                >
                  {author} |{" "}
                </a>
                <a
                  target="_blanc"
                  className="text-gray-600 hover:underline text-xs"
                  href={POINTS_URL + objectID}
                >
                  {created_at && moment(created_at, "YYYYMMDD").fromNow()} |{" "}
                </a>
                <a
                  target="_blanc"
                  className="text-gray-600 hover:underline text-xs"
                  href={POINTS_URL + objectID}
                >
                  {num_comments} comments
                </a>
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default NewsCards;
