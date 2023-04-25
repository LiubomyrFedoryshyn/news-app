import { FC } from "react";
import Link from "next/link";
import moment from "moment";
import classNames from "classnames";
import { POINTS_URL, AUTHOR_URL } from "@/utils/constants";

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
                    className="text-gray-600 hover:underline"
                    href={url}
                  >
                    ({url})
                  </a>
                )}
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
                  className="text-gray-600 hover:underline text-xs"
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
