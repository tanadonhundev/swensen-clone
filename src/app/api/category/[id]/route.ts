import { NextRequest } from "next/server";
import conn from "@/db";
import { productcategory } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } } 
) {
  try {
    // console.log(req)
    // return
    const id = parseInt(params.id);
    const db = await conn;

    const [deleteCategory] = await db
      .delete(productcategory)
      .where(eq(productcategory.id, id));

    if (!deleteCategory) {
      return Response.json({ error: "Category not found" }, { status: 404 });
    }

    return Response.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
