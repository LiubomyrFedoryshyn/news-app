import { FC } from "react";
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
        return (
          <div key={el?.objectID}>
            <div>
              <h6
                className={classNames({
                  "text-red-600": !el?.title,
                  "cursor-pointer": el?.title,
                })}
              >
                {el?.title || "This article has been removed"}{" "}
                {el?.url && (
                  <a
                    target="_blanc"
                    className="text-gray-600 hover:underline"
                    href={el?.url}
                  >
                    ({el?.url})
                  </a>
                )}
              </h6>
              <p>
                <a
                  target="_blanc"
                  className="text-gray-600 hover:underline text-xs"
                  href={POINTS_URL + el?.objectID}
                >
                  {el?.points} |{" "}
                </a>
                <a
                  target="_blanc"
                  className="text-gray-600 hover:underline text-xs"
                  href={AUTHOR_URL + el?.author}
                >
                  {el?.author} |{" "}
                </a>
                <a
                  target="_blanc"
                  className="text-gray-600 hover:underline text-xs"
                  href={POINTS_URL + el?.objectID}
                >
                  {el?.created_at &&
                    moment(el?.created_at, "YYYYMMDD").fromNow()}{" "}
                  |{" "}
                </a>
                <a
                  target="_blanc"
                  className="text-gray-600 hover:underline text-xs"
                  href={POINTS_URL + el?.objectID}
                >
                  {el?.num_comments} comments
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
