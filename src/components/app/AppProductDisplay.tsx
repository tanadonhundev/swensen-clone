"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

type Product = {
  id: number;
  category_name: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  productItems: {
    id: number;
    createdAt: Date | null;
    updatedAt: Date | null;
    categoryId: number;
    title: string | null;
    price: string;
    imageName: string;
  }[];
};

type ProductListProps = {
  products: Product[];
};

const AppProductDisplay = ({ products }: ProductListProps) => {
  const route = useRouter();
  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/product/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        alert("ลบข้อมูลสำเร็จ");
        route.refresh();
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  return (
    <Card className="w-full max-w-[1440px]">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl">รายการสินค้า</CardTitle>
      </CardHeader>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">หมวดหมู่</TableHead>
            <TableHead className="text-center">ชื่อสินค้า</TableHead>
            <TableHead className="text-center">ราคา</TableHead>
            <TableHead className="text-center">รูปภาพ</TableHead>
            <TableHead className="text-center">จัดการ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.flatMap((product) =>
            product.productItems.map((item) => (
              <TableRow key={item.id} className="border-b">
                <TableCell className="text-center">
                  {product.category_name}
                </TableCell>
                <TableCell className="text-center">{item.title}</TableCell>
                <TableCell className="text-center">{item.price}</TableCell>
                <TableCell className="text-center">{item.imageName}</TableCell>
                <TableCell className="text-center">
                  <button onClick={() => handleDelete(item.id)}>
                    <Trash2 className="text-red-500" />
                  </button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Card>
  );
};

export default AppProductDisplay;
