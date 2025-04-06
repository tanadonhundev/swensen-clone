import {
  mysqlTable,
  primaryKey,
  varchar,
  text,
  timestamp,
  int,
  decimal,
  unique,
  mysqlEnum,
  tinyint,
} from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const account = mysqlTable(
  "account",
  {
    id: varchar({ length: 36 }).notNull(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: varchar("user_id", { length: 36 })
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at", {
      mode: "string",
    }),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at", {
      mode: "string",
    }),
    scope: text(),
    password: text(),
    createdAt: timestamp("created_at", { mode: "string" }).notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" }).notNull(),
  },
  (table) => [primaryKey({ columns: [table.id], name: "account_id" })]
);

export const productCategory = mysqlTable(
  "product_category",
  {
    id: int().autoincrement().notNull(),
    categoryName: varchar("category_name", { length: 100 }).notNull(),
    createdAt: timestamp("created_at", { mode: "string" }).default(
      sql`(now())`
    ),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .default(sql`(now())`)
      .onUpdateNow(),
  },
  (table) => [primaryKey({ columns: [table.id], name: "product_category_id" })]
);

export const productItem = mysqlTable(
  "product_item",
  {
    id: int().autoincrement().notNull(),
    categoryId: int("category_id")
      .notNull()
      .references(() => productCategory.id),
    description: text(),
    price: decimal({ precision: 10, scale: 2 }).notNull(),
    imageName: text("image_name").notNull(),
    createdAt: timestamp("created_at", { mode: "string" }).default(
      sql`(now())`
    ),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .default(sql`(now())`)
      .onUpdateNow(),
  },
  (table) => [primaryKey({ columns: [table.id], name: "product_item_id" })]
);

export const session = mysqlTable(
  "session",
  {
    id: varchar({ length: 36 }).notNull(),
    expiresAt: timestamp("expires_at", { mode: "string" }).notNull(),
    token: varchar({ length: 255 }).notNull(),
    createdAt: timestamp("created_at", { mode: "string" }).notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" }).notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: varchar("user_id", { length: 36 })
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [
    primaryKey({ columns: [table.id], name: "session_id" }),
    unique("session_token_unique").on(table.token),
  ]
);

export const user = mysqlTable(
  "user",
  {
    id: varchar({ length: 36 }).notNull(),
    name: text().notNull(),
    email: varchar({ length: 255 }).notNull(),
    emailVerified: tinyint("email_verified").notNull(),
    image: text(),
    createdAt: timestamp("created_at", { mode: "string" }).notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" }).notNull(),
    role: mysqlEnum(["user", "admin"]).default("user"),
    birthDate: text(),
    gender: text(),
    phone: text(),
  },
  (table) => [
    primaryKey({ columns: [table.id], name: "user_id" }),
    unique("user_email_unique").on(table.email),
  ]
);

export const verification = mysqlTable(
  "verification",
  {
    id: varchar({ length: 36 }).notNull(),
    identifier: text().notNull(),
    value: text().notNull(),
    expiresAt: timestamp("expires_at", { mode: "string" }).notNull(),
    createdAt: timestamp("created_at", { mode: "string" }),
    updatedAt: timestamp("updated_at", { mode: "string" }),
  },
  (table) => [primaryKey({ columns: [table.id], name: "verification_id" })]
);
