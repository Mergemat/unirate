"use client";

import { type UseFormReturn, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardHeader, CardTitle } from "~/components/ui/card";
import { type Uni, insertReviewSchema } from "~/server/db/schema";
import { useUser } from "@clerk/nextjs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { Loader2, Star } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { api } from "~/trpc/react";
import { toast } from "~/components/ui/use-toast";
import { Separator } from "~/components/ui/separator";
import { cn } from "~/lib/utils";
import { Input } from "~/components/ui/input";

const reviewFormSchema = insertReviewSchema.extend({
  uniId: z.number(),
  text: z.string().min(1, { message: "Поле не может быть пустым" }).max(256, {
    message: "Максимальная длина 256 символов",
  }),
  rating: z.number().min(1, { message: "Укажите оценку" }),
  faculty: z.string().min(1, { message: "Укажите факультет" }),
  specialization: z.string().min(1, { message: "Укажите специальность" }),
});

export function ReviewForm({ uniId }: { uniId: Uni["id"] }) {
  const { user, isSignedIn, isLoaded } = useUser();
  const utils = api.useUtils();

  const { mutate } = api.review.create.useMutation({
    onMutate: async () => {
      toast({
        title: "Отправляем ваш отзыв",
      });
    },
    onSuccess: async () => {
      form.reset();
      await utils.review.invalidate();
      toast({
        title: "Отзыв отправлен",
      });
    },
    onError: (error) => {
      toast({
        title: "Произошла ошибка",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const { data: userReview } = api.review.byUserId.useQuery({
    uniId,
  });

  const form = useForm<z.infer<typeof reviewFormSchema>>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      uniId,
      text: "",
      faculty: "",
      rating: 0,
    },
  });

  function onSubmit(values: z.infer<typeof reviewFormSchema>) {
    mutate(values);
  }

  useEffect(() => {
    if (user) {
      form.setValue("authorId", user.id);
    }
  }, [form, user]);

  if (userReview?.length && userReview.length > 0) {
    return (
      <Card className="flex w-full items-center justify-center gap-5 rounded-xl bg-background/50 p-4 backdrop-blur-lg">
        <h1>Вы уже оставили отзыв</h1>
      </Card>
    );
  }

  if (!isLoaded) {
    return (
      <Card className="flex w-full items-center justify-center gap-5 rounded-xl bg-background/50 p-4 backdrop-blur-lg">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </Card>
    );
  }

  if (isLoaded && !isSignedIn) {
    return (
      <Card className="flex w-full items-center justify-center gap-5 rounded-xl bg-background/50 p-4 backdrop-blur-lg">
        <h1>Авторизуйтесь чтобы оставлять отзывы</h1>
      </Card>
    );
  }

  return (
    <Card className="flex w-full justify-between gap-5 rounded-xl bg-background/50 p-4 backdrop-blur-lg">
      <CardHeader className="p-0">
        <CardTitle>Оставить отзыв</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="faculty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Факультет</FormLabel>
                <FormControl>
                  <Input placeholder="Ваш факультет" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="specialization"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Специальность</FormLabel>
                <FormControl>
                  <Input placeholder="Ваша специальность" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Текст отзыва</FormLabel>
                <FormControl>
                  <Textarea placeholder="Напишите текст отзыва" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rating"
            render={() => (
              <FormItem>
                <FormLabel>Оценка</FormLabel>
                <FormControl>
                  <RatingInput form={form} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Отправить отзыв</Button>
        </form>
      </Form>
    </Card>
  );
}

function RatingInput({
  form,
}: {
  form: UseFormReturn<z.infer<typeof reviewFormSchema>>;
}) {
  const [hover, setHover] = useState(0);
  const rating = useWatch({
    control: form.control,
    name: "rating",
  });

  const setRating = useCallback(
    (i: number) => form.setValue("rating", i + 1),
    [form],
  );

  return (
    <div className="flex h-fit items-center gap-5">
      <div className="flex w-fit">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <Star
              key={i}
              size={32}
              onClick={() => setRating(i)}
              onMouseEnter={() => setHover(i + 1)}
              onMouseLeave={() => setHover(0)}
              className={cn(
                "h-8 w-10 cursor-pointer stroke-0 px-1 transition-transform duration-100 ease-in-out",
                i < rating
                  ? "fill-primary"
                  : i < hover
                    ? "scale-125 fill-primary/20"
                    : "fill-secondary-foreground/20",
              )}
            />
          ))}
      </div>
      <Separator orientation="vertical" className="h-6" />
      <p className="text-sm font-medium">{rating ?? 0}</p>
    </div>
  );
}
