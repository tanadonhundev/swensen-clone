import { mysqlTable, varchar, text, timestamp, int, decimal, unique, mysqlEnum, tinyint } from "drizzle-orm/mysql-core"


export const account = mysqlTable("account", {
	id: varchar({ length: 36 }).notNull(),
	accountId: text("account_id").notNull(),
	providerId: text("provider_id").notNull(),
	userId: varchar("user_id", { length: 36 }).notNull().references(() => user.id, { onDelete: "cascade" } ),
	accessToken: text("access_token").default('NULL'),
	refreshToken: text("refresh_token").default('NULL'),
	idToken: text("id_token").default('NULL'),
	accessTokenExpiresAt: timestamp("access_token_expires_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	refreshTokenExpiresAt: timestamp("refresh_token_expires_at", { mode: 'string' }).default('current_timestamp()'),
	scope: text().default('NULL'),
	password: text().default('NULL'),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('current_timestamp()').notNull(),
});

export const productCategory = mysqlTable("product_category", {
	id: int().autoincrement().notNull(),
	categoryName: varchar("category_name", { length: 100 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('current_timestamp()').notNull(),
});

export const productItem = mysqlTable("product_item", {
	id: int().autoincrement().notNull(),
	categoryId: int("category_id").notNull().references(() => productCategory.id, { onDelete: "cascade" } ),
	title: text().default('NULL'),
	price: decimal({ precision: 10, scale: 2 }).notNull(),
	imageName: text("image_name").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('current_timestamp()').notNull(),
});

export const session = mysqlTable("session", {
	id: varchar({ length: 36 }).notNull(),
	expiresAt: timestamp("expires_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	token: varchar({ length: 255 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	ipAddress: text("ip_address").default('NULL'),
	userAgent: text("user_agent").default('NULL'),
	userId: varchar("user_id", { length: 36 }).notNull().references(() => user.id, { onDelete: "cascade" } ),
},
(table) => [
	unique("session_token_unique").on(table.token),
]);

export const user = mysqlTable("user", {
	id: varchar({ length: 36 }).notNull(),
	name: text().notNull(),
	email: varchar({ length: 255 }).notNull(),
	birthDate: text().default('NULL'),
	gender: text().default('NULL'),
	phone: text().default('NULL'),
	emailVerified: tinyint("email_verified").notNull(),
	image: text().default('NULL'),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	role: mysqlEnum(['user','admin']).default("user"),
},
(table) => [
	unique("user_email_unique").on(table.email),
]);

export const verification = mysqlTable("verification", {
	id: varchar({ length: 36 }).notNull(),
	identifier: text().notNull(),
	value: text().notNull(),
	expiresAt: timestamp("expires_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('current_timestamp()').notNull(),
});
