import conn from "@/db";
import { productcategory } from "@/db/schema";

const db = await conn;

export async function POST(req: Request) {
  try {
    // ดึงข้อมูล JSON จาก request
    const items = await req.json();

    await db.insert(productcategory).values({
      category_name: items.title,
    });

    return new Response(
      JSON.stringify({ message: "ข้อมูลได้รับแล้ว", receivedData: items }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ error: "เกิดข้อผิดพลาดในการรับข้อมูล" }),
      {
        status: 400,
      }
    );
  }
}
