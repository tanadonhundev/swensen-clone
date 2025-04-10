import { NextRequest } from "next/server";
import conn from "@/db";
import { productcategory, productitem } from "@/db/schema";
import { eq } from "drizzle-orm";
import fs from "fs";
import path from "path";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const db = await conn;
    const product = await db
      .select()
      .from(productitem)
      .innerJoin(
        productcategory,
        eq(productitem.categoryId, productcategory.id)
      )
      .where(eq(productcategory.id, id));

    const [deleteCategory] = await db
      .delete(productcategory)
      .where(eq(productcategory.id, id));

    for (const item of product) {
      const fileName = item.product_item.imageName;
      const filePath = path.join(process.cwd(), "public/uploads", fileName);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath); // Delete the file
        console.log(`Deleted file: ${filePath}`);
      }
    }

    if (!deleteCategory) {
      return Response.json({ error: "Category not found" }, { status: 404 });
    }

    return Response.json({
      message: "Category deleted successfully",
      product,
    });
  } catch (error) {
    console.error("Error deleting category:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
