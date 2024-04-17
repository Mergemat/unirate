import { asc } from "drizzle-orm";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { unis } from "~/server/db/schema";

export const uniRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.unis.findMany({ orderBy: asc(unis.id) });
  }),
});
