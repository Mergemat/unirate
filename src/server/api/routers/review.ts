import { asc } from "drizzle-orm";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { reviews } from "~/server/db/schema";

export const reviewRouter = createTRPCRouter({
  recent: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.reviews.findMany({
      with: {
        uni: {
          columns: {
            name: true,
          },
        },
      },
      orderBy: asc(reviews.createdAt),
      limit: 5,
    });
  }),
});
