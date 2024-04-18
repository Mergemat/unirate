import { ReviewCard } from "~/components/review-list";
import { type Uni } from "~/server/db/schema";
import { api } from "~/trpc/server";

export async function ReviewList({ uniId }: { uniId: Uni["id"] }) {
  const reviews = await api.review.byUniId({ id: uniId });

  if (reviews.length === 0 || !reviews) {
    return (
      <div className="flex h-full w-full items-center justify-center text-lg text-muted-foreground">
        К этому университету пока нет отзывов
      </div>
    );
  }

  return (
    <>
      {reviews.map((review) => (
        <ReviewCard review={review} key={review.id} />
      ))}
    </>
  );
}
