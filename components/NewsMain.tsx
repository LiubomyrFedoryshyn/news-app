import { FC, useEffect, useState } from "react";
import moment from "moment";
import classNames from "classnames";
import { AUTHOR_URL, POINTS_URL } from "@/utils/constants";
import { Rate } from "./Rate";
import { isObjectEmpty } from "@/utils/actions/isObjectEmpty";
import { ILocNews, IMain } from "@/utils/interfaces";

const NewsMain: FC<IMain> = (props: IMain) => {
  const { news, objectID } = props;
  const { title, author, points, created_at } = news;
  const [activeNews, setActiveNews] = useState<ILocNews>(); // current active news

  useEffect(() => {
    const locNews = JSON.parse(localStorage.getItem("locNews") || "[]"); // get and set items from localstorage
    const myObj = locNews.find((el: ILocNews) => el.id === objectID) || {};
    setActiveNews(myObj);
  }, []);

  const addToStorage = (type: string) => {
    // had to do "rate" functionality in localstorage because I don't want to spend much time on fireBase setup or any other one, besides, in real case it should be same API so logicaly it hasn't make sence
    const parsedArr = JSON.parse(localStorage.getItem("locNews") || "[]");
    let currentArr = "[]";
    let myObj = parsedArr.find((el: ILocNews) => el.id === objectID) || {};

    if (isObjectEmpty(myObj)) {
      myObj = { id: objectID, type };
      currentArr = JSON.stringify([...parsedArr, myObj]); // add object to array
    } else {
      if (myObj.type === type) {
        myObj = {};
        currentArr = JSON.stringify([
          ...parsedArr.filter((el: ILocNews) => el.id !== objectID), // remove object from marked
        ]);
      } else {
        myObj = { ...myObj, type };
        currentArr = JSON.stringify([
          ...parsedArr.map((el: ILocNews) => (el.id === objectID ? myObj : el)), // change object property
        ]);
      }
    }
    setActiveNews(myObj);
    localStorage.setItem("locNews", currentArr); // set new array to locastorage
  };

  return (
    <div className="mb-2 font-mono" key={objectID}>
      <div>
        <h6>
          {title} {objectID && <Rate news={activeNews} />}
        </h6>
        <p>
          <a
            target="_blanc"
            className="text-gray-600 hover:underline text-xs"
            href={AUTHOR_URL + author}
          >
            {points} points by {author} on{" "}
          </a>
          <a
            target="_blanc"
            className="text-gray-600 hover:underline text-xs"
            href={POINTS_URL + objectID}
          >
            {created_at &&
              moment(created_at, "YYYYMMDD").format("MMMM Do, YYYY")}
          </a>
        </p>
        <p className="text-gray-600 text-xs">
          Add to:
          <span
            onClick={() => addToStorage("favorites")}
            className={classNames("hover:underline mx-2 cursor-pointer ", {
              "text-yellow-600": activeNews?.type === "favorites",
            })}
          >
            favorite
          </span>
          <span
            onClick={() => addToStorage("disliked")}
            className={classNames("hover:underline cursor-pointer ", {
              "text-red-600": activeNews?.type === "disliked",
            })}
          >
            disliked
          </span>
        </p>
      </div>
    </div>
  );
};

export default NewsMain;
