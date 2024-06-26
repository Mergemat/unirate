import { and, desc, eq } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { insertReviewSchema, reviews } from "~/server/db/schema";
import { z } from "zod";

export const reviewRouter = createTRPCRouter({
  byUniId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.reviews.findMany({
        where: eq(reviews.uniId, input.id),
        with: {
          uni: true,
        },

        orderBy: desc(reviews.createdAt),
      });
    }),

  recent: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.reviews.findMany({
      with: {
        uni: true,
      },
      orderBy: desc(reviews.createdAt),
      limit: 5,
    });
  }),

  create: publicProcedure
    .input(insertReviewSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.insert(reviews).values(input).returning();
    }),

  byUserId: protectedProcedure
    .input(z.object({ uniId: z.number().optional() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.reviews.findMany({
        where: and(
          eq(reviews.authorId, ctx.session.userId),
          input.uniId ? eq(reviews.uniId, input.uniId) : undefined,
        ),
        with: {
          uni: true,
        },
        orderBy: desc(reviews.createdAt),
      });
    }),
});
