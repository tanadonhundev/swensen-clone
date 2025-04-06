import { relations } from "drizzle-orm/relations";
import { user, account, productcategory, productitem, session } from "./schema";

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

export const productItemRelations = relations(productitem, ({one}) => ({
    productCategory: one(productcategory, {
        fields: [productitem.categoryId],
        references: [productcategory.id]
    }),
}));

export const productCategoryRelations = relations(productcategory, ({many}) => ({
    productItems: many(productitem),
}));

export const sessionRelations = relations(session, ({one}) => ({
    user: one(user, {
        fields: [session.userId],
        references: [user.id]
    }),
}));