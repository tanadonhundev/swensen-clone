import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
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

    // ค้นหาข้อมูลสินค้าก่อนเพื่อดึงชื่อไฟล์
    const product = await db
      .select()
      .from(productitem)
      .where(eq(productitem.id, id))
      .limit(1)
      .execute();

    if (product.length === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const fileName = product[0].imageName; // ดึงชื่อไฟล์รูปจากฐานข้อมูล

    // กำหนด path ที่เก็บไฟล์รูป
    const filePath = path.join(process.cwd(), "public/uploads", fileName);

    // ลบไฟล์จากโฟลเดอร์
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath); // ลบไฟล์
    }

    // ลบข้อมูลสินค้าจากฐานข้อมูล
    await db.delete(productitem).where(eq(productitem.id, id)).execute();

    return NextResponse.json({
      message: "Product and image deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const db = await conn;
    // ค้นหาข้อมูลสินค้าก่อนเพื่อดึงชื่อไฟล์
    const product = await db
      .select()
      .from(productitem)
      .where(eq(productitem.categoryId, id))
      .execute();
    if (product.length === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json({
      product,
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
