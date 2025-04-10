"use client";

import { z } from "zod";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

type Category = {
  id: number;
  category_name: string;
};

type ProductListCategory = {
  category: Category[];
};

const formSchema = z.object({
  title: z.string().min(1, { message: "ต้องมีอย่างน้อย 1 ตัว" }).trim(),
  price: z.string().min(0, { message: "ราคาไม่สามารถน้อยกว่า 0 ได้" }),
  categoryId: z.string({
    required_error: "กรุณาเลือกหหมวดหมู่",
  }),
  file: z.any(),
});

export default function AppFormAddProduct({ category }: ProductListCategory) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      price: "",
      categoryId: "",
      file: null,
    },
    mode: "onSubmit",
  });

  useEffect(() => {
    form.setFocus("title");
  }, [form]);

  const handleOnSubmit = async (data: z.infer<typeof formSchema>) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("price", data.price); // เป็น string อยู่แล้ว
    formData.append("categoryId", data.categoryId);

    // console.log(data.file)
    // return

    // ตรวจสอบว่ามีไฟล์ไหม แล้วค่อย append
    if (data.file) {
      formData.append("file", data.file);
    }
    console.log(formData);
    const response = await axios.post("/api/product", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 201) {
      alert("บันทึกข้อมูลสำเร็จ");
      form.reset({
        title: "",
        price: "",
        categoryId: "",
        file: null, // ถ้าใช้ไฟล์
      });
      router.refresh?.();
    } else {
      console.error("Error:", response.data);
      alert("บันทึกข้อมูลไม่สำเร็จ");
    }
  };

  return (
    <>
      <Card className="w-full max-w-[1440px]">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl">เพิ่มสินค้า</CardTitle>
          <Link href={"/category"}>
            <Button className="bg-blue-500 text-white">จัดการหมวดหมู่</Button>
          </Link>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleOnSubmit)}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>title</FormLabel>
                        <FormControl>
                          <Input {...field} type="text" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>price</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>หมวดหมู่</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="เลือกหมวดหมู่" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {category.length > 0 ? (
                              category.map((category) => (
                                <SelectItem
                                  key={category.id}
                                  value={category.id.toString()}
                                >
                                  {category.category_name}
                                </SelectItem>
                              ))
                            ) : (
                              <div>ไม่มีข้อมูลในระบบ</div>
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <FormField
                    control={form.control}
                    name="file"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Upload File</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            onChange={(e) =>
                              field.onChange(e.target.files?.[0])
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <Button type="submit" className="bg-red-500 w-full mt-5">
                บันทึก
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
