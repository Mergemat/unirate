import Image from "next/image";
import { Star } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { cn } from "~/lib/utils";

const unis = [
  {
    id: 1,
    name: "Дагестанский Государственный Университет Народного Хозяйства",
    tag: "ДГУНХ",
    imageUrl:
      "https://utfs.io/f/6a8e9411-d209-4b52-9501-6db48b26e9f0-hvnnlh.jpg",
  },
  {
    id: 2,
    name: "Дагестанский Государственный Университет",
    tag: "ДГУ",
    imageUrl:
      "https://utfs.io/f/ab662be5-ab5a-4562-bc71-ed05eb19b1d2-po4etp.jpg",
  },
  {
    id: 3,
    name: "Дагестанский государственный педагогический университет",
    tag: "ДГПУ",
    imageUrl:
      "https://utfs.io/f/4e06ec3c-68b7-4f53-a7d1-18c45e457979-j05g7o.jpg",
  },
  {
    id: 4,
    name: "Дагестанский государственный медицинский университет",
    tag: "ГМУ",
    imageUrl:
      "https://utfs.io/f/05a6e495-36e9-454d-8053-94cfcdd00fbe-lvvxnx.jpg",
  },
  {
    id: 5,
    name: "Дагестанский государственный аграрный университет имени М.М. Джамбулатова",
    tag: "ДГСХА",
    imageUrl:
      "https://utfs.io/f/e440410e-f1cd-4f96-9a80-3e0fe373eb9a-bbme8o.jpg",
  },
];

const lastReviews = [
  {
    id: 1,
    author: "Аноним",
    uni: 1,
    faculty: 1,
    text: "Лучший универ",
    stars: 5,
  },
  {
    id: 2,
    author: "Омаров Багаутдин",
    uni: 2,
    faculty: 1,
    text: "...",
    stars: 3,
  },
];

export default async function Home() {
  return (
    <div className="flex flex-col gap-5 p-2 px-5 lg:justify-between lg:flex-row">
      <div className="flex flex-col gap-5">
        {unis.map((uni) => (
          <Card className="w-fill card p-2 lg:card-side" key={uni.id}>
            <CardContent className="lg:w-[300px] p-0">
              <Image
                src={uni.imageUrl}
                alt={""}
                className="rounded-md"
                style={{ objectFit: "cover", width: "100%", height: "200px" }}
                width={200}
                height={200}
              />
            </CardContent>
            <CardHeader className="">
              <CardTitle>{uni.name}</CardTitle>
              <CardDescription>{uni.tag}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
      <Card className="h-fit xl:w-1/3">
        <CardHeader>
          <CardTitle>Последние отзывы</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {lastReviews.map((review) => (
            <div
              key={review.id}
              className="flex flex-col gap-4 rounded-md border p-4"
            >
              <div>
                <h1 className="font-semibold">{review.author}</h1>
                <h1 className="text-md w-72 text-muted-foreground">
                  {unis[review.uni]!.name}
                </h1>
              </div>
              <p className="text-base">{review.text}</p>
              <div className="flex gap-2">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "fill-muted stroke-0",
                        i < review.stars ? "fill-primary" : "",
                      )}
                    />
                  ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
