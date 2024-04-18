import { Star } from "lucide-react";
import { cn } from "~/lib/utils";

export function Rating({
  rating,
  size = 24,
}: {
  rating: number;
  size?: number;
}) {
  return (
    <div className="flex gap-2 h-fit">
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <Star
            key={i}
            size={size}
            className={cn(
              "stroke-0",
              i < rating ? "fill-primary" : "fill-secondary-foreground/20",
            )}
          />
        ))}
    </div>
  );
}

export function RatingSkeleton({ size = 24 }: { size?: number }) {
  return (
    <div className="flex gap-2 h-fit">
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <Star
            key={i}
            size={size}
            className="animate-pulse fill-muted stroke-0"
          />
        ))}
    </div>
  );
}
