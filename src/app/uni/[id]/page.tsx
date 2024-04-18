import Image from "next/image";
import { Suspense } from "react";
import { Rating, RatingSkeleton } from "~/components/Rating";
import { ReviewCardSkeleton } from "~/components/review-card";
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

  const rating = await api.uni.rating({ id: uniId });

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
        <UniInfo uni={uni} rating={rating} />
        <ReviewForm uniId={uniId} />
      </div>
      <Reviews uniId={uni.id} />
    </div>
  );
}

export function UniInfo({ uni, rating }: { uni: Uni; rating: number }) {
  return (
    <Card className="flex w-full justify-between gap-5 rounded-xl bg-background/50 p-4 backdrop-blur-lg">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold md:w-[600px] md:text-4xl">
          {uni.name}
        </h1>
        <p className="w-fit text-muted-foreground">{uni.tag}</p>
      </div>
      <Card className="flex w-fit items-center justify-between rounded-xl bg-background/50 p-4 backdrop-blur-lg xl:card-side">
        <Rating rating={rating} size="lg" />
      </Card>
    </Card>
  );
}

async function Reviews({ uniId }: { uniId: Uni["id"] }) {
  return (
    <Card className="h-fit w-full">
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
