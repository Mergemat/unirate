import { clerkClient } from "@clerk/nextjs/server";
import { Rating, RatingSkeleton } from "./Rating";
import { Skeleton } from "./ui/skeleton";
import { type ReviewWithUni } from "~/server/db/schema";
import { cn } from "~/lib/utils";

export async function ReviewCard({
  review,
  preview = false,
}: {
  review: ReviewWithUni;
  preview?: boolean;
}) {
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
    <div className="flex flex-col gap-4 rounded-xl border p-4">
      <div>
        <h1 className="font-semibold">{getAuthorName(review.authorId)}</h1>
        <h1 className="text-md w-72 text-muted-foreground">
          {review.uni.name}
        </h1>
      </div>
      <p
        className={cn(
          "text-base",
          preview
            ? "line-clamp-3 max-h-[4.9rem] overflow-hidden text-ellipsis"
            : "",
        )}
      >
        {review.text}
      </p>
      <Rating rating={review.rating} size="sm" />
    </div>
  );
}

export function ReviewCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden gap-6 rounded-xl border p-4">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-6 w-32 font-semibold" />
        <Skeleton className="text-md h-4 w-72 text-muted-foreground" />
        <Skeleton className="text-md h-4 w-44 text-muted-foreground" />
      </div>
      <div className="flex flex-col gap-3">
        <Skeleton className="h-3 w-full text-base" />
        <Skeleton className="h-3 w-full text-base" />
        <Skeleton className="h-3 w-3/5 text-base" />
      </div>
      <RatingSkeleton size="sm" />
    </div>
  );
}
