import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import conn from "@/db";
import { productitem } from "@/db/schema";

export async function POST(req: NextRequest) {
  // ดึงข้อมูล JSON จาก request
  const formData = await req.formData();
  const db = await conn;
  const title = formData.get("title") as string;
  const price = formData.get("price") as string;
  const categoryId = formData.get("categoryId") as string;
  const file = formData.get("file") as File | null;
  
  if (file) {
    const fileName = file.name;
    const uploadDir = path.join(process.cwd(), 'public/uploads'); // Define the upload directory
    
    // Ensure the upload directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    // Save the file to the upload directory
    const filePath = path.join(uploadDir, fileName);
    
    // Convert the file to a buffer and write it to the file system
    const buffer = await file.arrayBuffer();
    fs.writeFileSync(filePath, Buffer.from(buffer));

    // Insert product into the database with the image name
    await db.insert(productitem).values({
      categoryId: Number(categoryId),
      title,
      price,
      imageName: fileName,
    });

    return NextResponse.json(
      { message: "บันทึกคำสั่งซื้อสำเร็จ" },
      { status: 201 }
    );
  }
  
  return NextResponse.json({ message: "ไฟล์ไม่ถูกต้อง" }, { status: 400 });
}
