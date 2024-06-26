import { relations, sql } from "drizzle-orm";
import { index, int, sqliteTableCreator, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { type z } from "zod";

export const createTable = sqliteTableCreator((name) => `unirate_${name}`);

export const unis = createTable("uni", {
  id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name", { length: 256 }).notNull(),
  tag: text("tag", { length: 256 }).notNull(),
  imageUrl: text("image_url", { length: 256 }).notNull(),
});

export const updateUniSchema = createSelectSchema(unis);
export type Uni = z.infer<typeof updateUniSchema>;

export const reviews = createTable(
  "review",
  {
    id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    text: text("description", { length: 256 }).notNull(),
    rating: int("rating", { mode: "number" }).notNull(),
    uniId: int("uni_id", { mode: "number" })
      .references(() => unis.id, {
        onDelete: "cascade",
      })
      .notNull(),
    authorId: text("user_id").notNull(),
    createdAt: int("created_at", { mode: "timestamp" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: int("updatedAt", { mode: "timestamp" }),
    faculty: text("faculty", { length: 256 }),
    specialization: text("specialization", { length: 256 }),
  },
  (review) => {
    return {
      propertyIdx: index("review_property_indx").on(review.uniId),
    };
  },
);

export const updateReviewSchema = createSelectSchema(reviews);
export const reviewSchemaWithUni = updateReviewSchema.extend({
  uni: updateUniSchema,
});

export const insertReviewSchema = createInsertSchema(reviews).omit({
  id: true,
});

export type Review = z.infer<typeof updateReviewSchema>;
export type ReviewWithUni = z.infer<typeof reviewSchemaWithUni>;

export const reviewRelations = relations(reviews, ({ one }) => ({
  uni: one(unis, {
    fields: [reviews.uniId],
    references: [unis.id],
  }),
}));
