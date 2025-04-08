import "server-only";
import conn from "@/db";
import { desc } from "drizzle-orm";
import { productcategory } from "@/db/schema";

const db = await conn;

export async function getProductService() {
  // select * from product
  return await db.query.productcategory.findMany({
    orderBy: desc(productcategory.id),
    with: {
      productItems: true,
    },
  });
}

export async function getProductCategoryService() {
  // select * from product
  return await db.query.productcategory.findMany({
    orderBy: desc(productcategory.id),
    columns: {
      id: true,
      category_name: true,
    },
  });
}
