import { useRouter } from "next/router";
import { getDetails } from "../api/methods";
import NewsMain from "@/components/NewsMain";
import { Loader } from "@/components/Loader";

const Post = () => {
  const { query } = useRouter();
  const { id }: { id?: string } = query;
  const { data = {}, isLoading } = getDetails(id);
  return isLoading ? <Loader /> : <NewsMain news={data} />;
};

export default Post;
