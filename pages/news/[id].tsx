import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { getDetails } from "../api/methods";
import { IMain } from "@/utils/interfaces";

const Loader = dynamic<{}>(() =>
  import("../../components/Loader").then((mod) => mod.Loader)
);

const NewsMain = dynamic<IMain>(() =>
  import("../../components/NewsMain").then((mod) => mod.default)
);

const News = () => {
  const { query } = useRouter();
  const { id }: { id?: string } = query;
  const { data = {}, isLoading } = getDetails(id);
  return isLoading ? <Loader /> : <NewsMain news={data} objectID={id} />;
};

export default News;
