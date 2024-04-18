import { Star } from "lucide-react";
import { cn } from "~/lib/utils";
import { Separator } from "./ui/separator";

export function Rating({
  rating,
  size = 24,
}: {
  rating: number;
  size?: number;
}) {
  const roundedRating = Math.floor(rating);
  return (
    <div className="flex h-fit items-center gap-2">
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <Star
            key={i}
            size={size}
            className={cn(
              "stroke-0",
              i < roundedRating
                ? "fill-primary"
                : "fill-secondary-foreground/20",
            )}
          />
        ))}
      <Separator orientation="vertical" className="h-6" />
      <p className="text-sm font-medium">{roundedRating ?? 0}</p>
    </div>
  );
}

export function RatingSkeleton({ size = 24 }: { size?: number }) {
  return (
    <div className="flex h-fit gap-2">
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <Star
            key={i}
            size={size}
            className="animate-pulse fill-secondary-foreground/5 stroke-0"
          />
        ))}
    </div>
  );
}
