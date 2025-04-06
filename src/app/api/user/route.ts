import conn from "@/db";
import { user } from "@/db/schema";

const db = await conn;

export async function POST(req: Request) {
  try {
    // ดึงข้อมูล JSON จาก request
    const items = await req.json();

    // สมมติว่า items.id เป็น string หรือ number
    await db
      .update(user)
      .set({
        birthDate: items.birthDate,
        gender: items.gender,
        phone: items.phone,
      })
      .where({ id: items.id });

    return new Response(
      JSON.stringify({ message: "ข้อมูลได้รับแล้ว", receivedData: items }), // คืนค่า items ที่ได้รับ
      {
        status: 200,
      }
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    // ส่ง response กลับไปหากเกิดข้อผิดพลาด
    return new Response(
      JSON.stringify({ error: "เกิดข้อผิดพลาดในการรับข้อมูล" }),
      {
        status: 400,
      }
    );
  }
}
