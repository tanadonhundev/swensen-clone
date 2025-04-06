import { relations } from "drizzle-orm/relations";
import { user, account, productCategory, productItem, session } from "./schema";

export const accountRelations = relations(account, ({one}) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id]
	}),
}));

export const userRelations = relations(user, ({many}) => ({
	accounts: many(account),
	sessions: many(session),
}));

export const productItemRelations = relations(productItem, ({one}) => ({
	productCategory: one(productCategory, {
		fields: [productItem.categoryId],
		references: [productCategory.id]
	}),
}));

export const productCategoryRelations = relations(productCategory, ({many}) => ({
	productItems: many(productItem),
}));

export const sessionRelations = relations(session, ({one}) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	}),
}));