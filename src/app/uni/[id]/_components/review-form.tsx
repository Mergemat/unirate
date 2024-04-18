"use client";

import { UseFormReturn, useForm, useWatch } from "react-hook-form";
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
import { useRouter } from "next/navigation";
import { Separator } from "~/components/ui/separator";
import { cn } from "~/lib/utils";

const reviewFormSchema = insertReviewSchema.extend({
  uniId: z.number(),
  text: z.string().min(1, { message: "Поле не может быть пустым" }).max(256, {
    message: "Максимальная длина 256 символов",
  }),
  rating: z.number().min(1, { message: "Укажите оценку" }),
});

export function ReviewForm({ uniId }: { uniId: Uni["id"] }) {
  const { user, isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  const { mutate } = api.review.create.useMutation({
    onMutate: async () => {
      toast({
        title: "Отправляем ваш отзыв",
      });
    },
    onSuccess: async () => {
      form.reset();
      router.refresh();
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

  const form = useForm<z.infer<typeof reviewFormSchema>>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      uniId,
      text: "",
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
                "cursor-pointer stroke-0 w-10 px-1 h-8",
                i < rating
                  ? "fill-primary"
                  : i < hover
                    ? "fill-primary/20"
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
