import { NextRequest } from "next/server";
import conn from "@/db";
import { productitem } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const db = await conn;

    const [deleteProduct] = await db
      .delete(productitem)
      .where(eq(productitem.id, id));

    if (!deleteProduct) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }

    return Response.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
