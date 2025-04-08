"use client";

import { z } from "zod";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
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

const formSchema = z.object({
  title: z.string().min(1, { message: "ต้องมีอย่างน้อย 1 ตัว" }).trim(),
});

export default function AppFormAddCategory() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
    mode: "onSubmit",
  });

  useEffect(() => {
    form.setFocus("title");
  }, [form]);

  const handleOnSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const newProduct = {
        title: data.title,
      };

      const response = await fetch("/api/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        alert("บันทึกข้อมูลสำเร็จ");
        form.reset();
      } else {
        const error = await response.json();
        console.log(error);
        alert("บันทึกข้อมูลไม่สำเร็จ");
        console.error("Error adding product:", error);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  return (
    <>
      <Card className="w-[1000px]">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl">เพิ่มหมวดหมู่</CardTitle>
          <Link href={"/product"}>
            <Button className="bg-blue-500 text-white">จัดการสินค้า</Button>
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
