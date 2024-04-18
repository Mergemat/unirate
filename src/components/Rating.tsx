import { Star } from "lucide-react";
import { cn } from "~/lib/utils";
import { Separator } from "./ui/separator";

export function Rating({
  rating,
  size = "lg",
}: {
  rating: number;
  size?: "sm" | "lg";
}) {
  const roundedRating = Math.floor(rating);
  return (
    <div className="flex h-fit items-center gap-3">
      <div className="flex w-fit">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <Star
              key={i}
              size={32}
              className={cn(
                "stroke-0 px-1",
                i < roundedRating
                  ? "fill-primary"
                  : "fill-secondary-foreground/20",
                size === "lg" ? "h-8 w-10" : "h-6 w-8",
              )}
            />
          ))}
      </div>
      <Separator orientation="vertical" className="h-6" />
      <p className="text-sm font-medium">{roundedRating ?? 0}</p>
    </div>
  );
}

export function RatingSkeleton({ size = "lg" }: { size?: "sm" | "lg" }) {
  return (
    <div className="flex h-fit items-center gap-5">
      <div className="flex w-fit">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <Star
              key={i}
              size={32}
              className={cn(
                "animate-pulse fill-secondary-foreground/5 stroke-0",
                size === "lg" ? "h-8 w-10" : "h-6 w-8",
              )}
            />
          ))}
      </div>
    </div>
  );
}
