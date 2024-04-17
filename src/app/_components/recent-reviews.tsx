import { Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/server";
import { Suspense } from "react";
import { Skeleton } from "~/components/ui/skeleton";
import { clerkClient } from "@clerk/nextjs/server";

export async function RecentReviews() {
  return (
    <Card className="sticky top-2 h-fit xl:w-1/3">
      <CardHeader>
        <CardTitle>Последние отзывы</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Suspense fallback={<RecentReviewsSkeleton />}>
          <ReviewList />
        </Suspense>
      </CardContent>
    </Card>
  );
}

async function ReviewList() {
  const reviews = await api.review.recent();

  const getAuthorName = async (id: string) => {
    const author = await clerkClient.users.getUser(id);

    if (!author) {
      return "Аноним";
    }

    if (!author.fullName) {
      return "Аноним";
    }

    if (author.fullName) {
      return author.fullName;
    }

    return author.fullName;
  };

  return (
    <>
      {reviews.map((review) => (
        <div
          key={review.id}
          className="flex flex-col gap-4 rounded-xl border p-4"
        >
          <div>
            <h1 className="font-semibold">{getAuthorName(review.authorId)}</h1>
            <h1 className="text-md w-72 text-muted-foreground">
              {review.uni.name}
            </h1>
          </div>
          <p className="text-base h-[4.9rem] overflow-hidden line-clamp-3 text-ellipsis">{review.text}</p>
          <div className="flex gap-2">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "fill-muted stroke-0",
                    i < review.rating ? "fill-primary" : "",
                  )}
                />
              ))}
          </div>
        </div>
      ))}
    </>
  );
}

function RecentReviewsSkeleton() {
  return (
    <div className="flex flex-col gap-6 rounded-xl border p-4">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-6 w-32 font-semibold" />
        <Skeleton className="text-md h-4 w-72 text-muted-foreground" />
        <Skeleton className="text-md h-4 w-44 text-muted-foreground" />
      </div>
      <Skeleton className="h-3 w-32 text-base" />
      <div className="flex gap-2">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <Star key={i} className={cn("fill-muted stroke-0")} />
          ))}
      </div>
    </div>
  );
}
