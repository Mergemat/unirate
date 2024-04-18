import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { api } from "~/trpc/server";
import { Suspense } from "react";
import { ReviewCard, ReviewCardSkeleton } from "~/components/review-card";

export async function RecentReviews() {
  return (
    <Card className="sticky top-2 h-fit lg:w-1/3">
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

  if (reviews.length === 0 || !reviews) {
    return (
      <div className="flex h-full w-full items-center justify-center text-lg text-muted-foreground">
        Отзывов пока нет
      </div>
    );
  }

  return (
    <>
      {reviews.map((review) => (
        <ReviewCard review={review} preview key={review.id} />
      ))}
    </>
  );
}
