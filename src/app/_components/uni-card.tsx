import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { type Uni } from "~/server/db/schema";

export function UniCard({ uni }: { uni: Uni }) {
  return (
    <Card className="w-fill card p-2 lg:card-side">
      <CardContent className="p-0 lg:w-[300px]">
        <Image
          src={uni.imageUrl}
          alt={""}
          className="rounded-xl"
          style={{ objectFit: "cover", width: "100%", height: "200px" }}
          width={200}
          height={200}
        />
      </CardContent>
      <CardHeader className="lg:w-2/4">
        <CardTitle>{uni.name}</CardTitle>
        <CardDescription>{uni.tag}</CardDescription>
      </CardHeader>
    </Card>
  );
}
