import Image from "next/image";
import { Suspense } from "react";
import { Rating, RatingSkeleton } from "~/components/Rating";
import { ReviewCard, ReviewCardSkeleton } from "~/components/review-list";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { ScrollArea } from "~/components/ui/scroll-area";
import { type Uni } from "~/server/db/schema";
import { api } from "~/trpc/server";
import { imageShimmer, toBase64 } from "~/utils/images";

export default async function UniPage({ params }: { params: { id: string } }) {
  const uniId = Number(params.id);

  if (isNaN(uniId)) {
    return <div>Invalid ID</div>;
  }

  const uni = await api.uni.byId({ id: uniId });

  if (!uni) {
    return <div>Университет с ID {uniId} не существует</div>;
  }

  return (
    <>
      <Image
        src={uni.imageUrl}
        alt={""}
        style={{ objectFit: "cover", width: "100%", height: "400px" }}
        placeholder={`data:image/svg+xml;base64,${toBase64(
          imageShimmer(1000, 400),
        )}`}
        width={1000}
        height={400}
      />
      <div className="mt-10 flex flex-col xl:flex-row w-full max-w-screen-2xl justify-between gap-10 p-2 lg:justify-between xl:mx-auto">
        <div className="flex flex-col gap-4">
          <Card className="flex w-fit justify-between rounded-xl bg-background/50 p-4 backdrop-blur-lg">
            <h1 className="text-2xl font-bold md:w-[600px] md:text-4xl">
              {uni.name}
            </h1>
            <p className="w-fit text-muted-foreground">{uni.tag}</p>
          </Card>
          <Card className="flex w-fit items-center justify-between rounded-xl bg-background/50 p-4 backdrop-blur-lg xl:card-side">
            <Suspense fallback={<RatingSkeleton size={32} />}>
              <RatingCard uniId={uni.id} />
            </Suspense>
          </Card>
        </div>
        <Reviews />
      </div>
    </>
  );
}

async function RatingCard({ uniId }: { uniId: Uni["id"] }) {
  const rating = await api.uni.rating({ id: uniId });

  return <Rating rating={rating} size={32} />;
}

async function Reviews() {
  return (
    <Card className="sticky top-2 w-full">
      <CardHeader>
        <CardTitle>Отзывы</CardTitle>
      </CardHeader>
      <ScrollArea>
        <CardContent className="flex flex-col gap-4 h-96 xl:h-[600px]">
          <Suspense fallback={<ReviewCardSkeleton />}>
            <ReviewList />
          </Suspense>
        </CardContent>
      </ScrollArea>
    </Card>
  );
}

async function ReviewList() {
  const reviews = await api.review.recent();

  return (
    <>
      {[
        ...reviews,
        ...reviews,
        ...reviews,
        ...reviews,
        ...reviews,
        ...reviews,
        ...reviews,
        ...reviews,
        ...reviews,
      ].map((review) => (
        <ReviewCard review={review} preview key={review.id} />
      ))}
    </>
  );
}
