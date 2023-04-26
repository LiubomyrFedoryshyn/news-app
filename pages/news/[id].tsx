import { useRouter } from "next/router";
import { getDetails } from "../api/methods";
import { Loader } from "@/components/Loader";
import NewsMain from "@/components/NewsMain";

const News = () => {
  const { query } = useRouter();
  const { id }: { id?: string } = query;
  const { data = {}, isLoading } = getDetails(id);
  return isLoading ? <Loader /> : <NewsMain news={data} objectID={id} />;
};

export default News;
