import { integer, pgTable, varchar, text, index } from "drizzle-orm/pg-core";
import { generateId } from "../helper/id";
import { timestamps } from "../helper/columns";

export const users = pgTable(
  "users",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => generateId("user")),
    name: varchar({ length: 255 }).notNull(),
    age: integer().notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    occupation: varchar({ length: 255 }),
    gender: varchar({ length: 16 }).default("male"),
    identity: varchar({ length: 16 }).default("cd"),
    sexuality: varchar({ length: 255 }).default("bisexual"),
    city: varchar({ length: 255 }),
    ...timestamps,
  },
  (table) => [index("idx_users_email").on(table.email)],
);
