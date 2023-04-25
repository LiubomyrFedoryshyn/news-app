import { AUTHOR_URL } from "@/utils/constants";
import { FC } from "react";

interface INews {
  objectID: string;
  title: string;
  author: string;
}

interface IMain {
  news: INews;
}

const NewsMain: FC<IMain> = (props: IMain) => {
  const { news } = props;
  const { objectID, title, author } = news;
  return (
    <div className="mb-2" key={objectID}>
      <div>
        <h6>{title}</h6>
        <p>
          <a
            target="_blanc"
            className="text-gray-600 hover:underline text-xs"
            href={AUTHOR_URL + author}
          >
            by {author}
          </a>
        </p>
      </div>
    </div>
  );
};

export default NewsMain;
