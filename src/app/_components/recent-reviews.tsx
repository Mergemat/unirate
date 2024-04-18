import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { api } from "~/trpc/server";
import { Suspense } from "react";
import { ReviewCard, ReviewCardSkeleton } from "~/components/review-list";

export async function RecentReviews() {
  return (
    <Card className="sticky top-2 h-fit xl:w-1/3">
      <CardHeader>
        <CardTitle>Последние отзывы</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Suspense fallback={<ReviewCardSkeleton />}>
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
        <ReviewCard review={review} preview key={review.id} />
      ))}
    </>
  );
}
