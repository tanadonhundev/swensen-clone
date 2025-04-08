import conn from "@/db";
import { productitem } from "@/db/schema";

const db = await conn;

export async function POST(req: Request) {
  try {
    // ดึงข้อมูล JSON จาก request
    const items = await req.json();

    await db.insert(productitem).values({
      categoryId: items.categoryId, // เชื่อมโยงกับ category ที่มีอยู่
      title: items.title,
      price: items.price.toString(),
      imageName: items.imageName,
    });

    return new Response(
      JSON.stringify({ message: "ข้อมูลได้รับแล้ว", receivedData: items }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error)
    return new Response(
      JSON.stringify({ error: "เกิดข้อผิดพลาดในการรับข้อมูล" }),
      {
        status: 400,
      }
    );
  }
}
