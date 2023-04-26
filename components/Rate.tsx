import { ILocNews } from "@/utils/interfaces";
import { FC } from "react";

interface IRate {
  news?: ILocNews;
}

export const Rate: FC<IRate> = (props: IRate) => {
  const { news } = props;

  const uniCode = () => {
    switch (news?.type) {
      case "disliked":
        return <span className="text-red-600 ml-2">&#x2613;</span>;
      case "favorites":
        return <span className="text-yellow-600 ml-2">&#x2605;</span>;
      default:
        return null;
    }
  };

  return uniCode();
};
