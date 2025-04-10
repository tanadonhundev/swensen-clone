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
import axios from "axios";

type Category = {
  id: number;
  category_name: string;
};

type categoryListProps = {
  category: Category[];
};

const AppCategoryDisplay = ({ category }: categoryListProps) => {
  const route = useRouter();
  const handleDelete = async (id: number) => {
    try {
      const response = await axios.delete(`/api/category/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      if (response.status === 200) {
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
        <CardTitle className="text-2xl">รายการหมวดหมู่</CardTitle>
      </CardHeader>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">หมวดหมู่</TableHead>
            <TableHead className="text-center">จัดการ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {category.map((item) => {
            return (
              <TableRow key={item.id} className="border-b">
                <TableCell className="text-center">
                  {item.category_name}
                </TableCell>
                <TableCell className="text-center">
                  <button onClick={() => handleDelete(item.id)}>
                    <Trash2 className="text-red-500" />
                  </button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );
};

export default AppCategoryDisplay;
