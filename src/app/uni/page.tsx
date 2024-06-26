import { RecentReviews } from "./_components/recent-reviews";
import { UniCard } from "./_components/uni-card";
import { api } from "~/trpc/server";

export default async function Home() {
  const unis = await api.uni.all();
  return (
    <>
      <div className="flex max-w-screen-xl flex-col gap-5 p-2 px-5 lg:flex-row lg:justify-between xl:mx-auto">
        <div className="flex flex-col gap-5">
          {unis.map((uni) => (
            <UniCard key={uni.id} uni={uni} />
          ))}
        </div>
        <RecentReviews />
      </div>
    </>
  );
}
