import useSWR from "swr";
import { fetcher } from "./fetcher";

export const Request = (url: string | null, repeatInterval?: number) => {
  const { data, error, isLoading } = useSWR(url ? url : null, fetcher, {
    // I used the useSWR hook as a method for API fetching because I wanted to try something new and this feature is kind of fresh.
    // It became a great opportunity to train my skills beyond regular fetch or axios libraries.
    // Additionally, the official documentation states that it caches data by default, and this functionality is actually what we needed.
    //Some even say that this is the best way to communicate with an API, avoiding other hooks, but who am I to judge? :)
    refreshInterval: repeatInterval || 0,
    // I've decided to update the news with a refreshInterval because I think adding useSWRSubscription wasn't necessary for this type of feature.
    // The list of news is strongly scoped to 1000 items with the API and, due to the task, it should only contain top stories.
    // This means the list wouldn't be updated very often, so subscriptions or web sockets aren't needed in my opinion.
    // Besides, it is a faster way to implement such a thing, especially given that the test task should be completed promptly."
  });
  if (error) {
    throw { error };
  }
  return { data, isLoading };
};
