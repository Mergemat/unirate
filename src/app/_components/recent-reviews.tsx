import { Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { cn } from "~/lib/utils";
import { unis } from "../temp-constants";
import { api } from "~/trpc/server";
import { Suspense } from "react";
import { Skeleton } from "~/components/ui/skeleton";

const lastReviews = [
  {
    id: 1,
    author: "Аноним",
    uni: 1,
    faculty: 1,
    text: "Лучший универ",
    stars: 5,
  },
  {
    id: 2,
    author: "Омаров Багаутдин",
    uni: 2,
    faculty: 1,
    text: "...",
    stars: 3,
  },
];

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

  return (
    <>
      {reviews.map((review) => (
        <div
          key={review.id}
          className="flex flex-col gap-4 rounded-xl border p-4"
        >
          <div>
            <h1 className="font-semibold">{review.authorId}</h1>
            <h1 className="text-md w-72 text-muted-foreground">
              {review.uni.name}
            </h1>
          </div>
          <p className="text-base">{review.text}</p>
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
        <Skeleton className="text-md w-72 h-4 text-muted-foreground" />
        <Skeleton className="text-md w-44 h-4 text-muted-foreground" />
      </div>
      <Skeleton className="h-3 w-32 text-base"/>
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
