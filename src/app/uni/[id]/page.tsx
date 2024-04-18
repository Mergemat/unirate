import Image from "next/image";
import { Suspense } from "react";
import { Rating, RatingSkeleton } from "~/components/Rating";
import { ReviewCard, ReviewCardSkeleton } from "~/components/review-list";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { ScrollArea } from "~/components/ui/scroll-area";
import { type Uni } from "~/server/db/schema";
import { api } from "~/trpc/server";
import { imageShimmer, toBase64 } from "~/utils/images";
import { ReviewForm } from "./_components/review-form";
import { ReviewList } from "./_components/review-list";

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
    <div className="mt-10 flex w-full max-w-screen-2xl flex-col justify-between gap-10 p-2 pb-10 lg:justify-between xl:mx-auto xl:flex-row">
      <div className="flex flex-col gap-4">
        <Card className="w-fill flex justify-between rounded-xl bg-background/50 p-4 backdrop-blur-lg">
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
        </Card>

        <Card className="flex w-full justify-between gap-5 rounded-xl bg-background/50 p-4 backdrop-blur-lg">
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold md:w-[600px] md:text-4xl">
              {uni.name}
            </h1>
            <p className="w-fit text-muted-foreground">{uni.tag}</p>
          </div>
          <Card className="flex w-fit items-center justify-between rounded-xl bg-background/50 p-4 backdrop-blur-lg xl:card-side">
            <Suspense fallback={<RatingSkeleton size={32} />}>
              <RatingCard uniId={uni.id} />
            </Suspense>
          </Card>
        </Card>
        <ReviewForm uniId={uniId} />
      </div>
      <Reviews uniId={uni.id} />
    </div>
  );
}

async function RatingCard({ uniId }: { uniId: Uni["id"] }) {
  const rating = await api.uni.rating({ id: uniId });

  return <Rating rating={rating} size={32} />;
}

async function Reviews({ uniId }: { uniId: Uni["id"] }) {
  return (
    <Card className="w-full h-fit">
      <CardHeader>
        <CardTitle>Отзывы</CardTitle>
      </CardHeader>
      <ScrollArea>
        <CardContent className="flex h-96 flex-col gap-4 xl:h-[600px]">
          <Suspense fallback={<ReviewCardSkeleton />}>
            <ReviewList uniId={uniId} />
          </Suspense>
        </CardContent>
      </ScrollArea>
    </Card>
  );
}
