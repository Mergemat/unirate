import { asc, eq } from "drizzle-orm";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { unis } from "~/server/db/schema";
import { z } from "zod";

export const uniRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.unis.findMany({ orderBy: asc(unis.id) });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.unis.findFirst({ where: eq(unis.id, input.id) });
    }),
});
