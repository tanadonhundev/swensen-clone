"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";

const formSchema = z.object({
  firstName: z.string().min(2, { message: "กรุณากรอกอย่างน้อย 2 ตัวอักษร" }),
  lastName: z.string().min(2, { message: "กรุณากรอกอย่างน้อย 2 ตัวอักษร" }),
  email: z.string().email({ message: "กรุณากรอกอีเมลให้ถูกต้อง" }).trim(),
  password: z.string().min(8, { message: "ต้องมีอย่างน้อย 8 ตัว" }).trim(),
  phone: z
    .string()
    .min(10, { message: "กรุณากรอกเบอร์โทรศัพท์" })
    .max(10, "กรุณากรอกเบอร์โทรศัพท์"),
  gender: z.enum(["male", "female", "other"], {
    required_error: "กรุณาเลือกเพศ",
  }),
  dob: z.date({
    required_error: "กรุณาใส่วันเกิด",
  }),
  acceptTerms: z.boolean(),
  acceptMarketing: z.boolean(),
});

export default function RegisterForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
      gender: "male",
      dob: undefined,
      acceptTerms: false,
      acceptMarketing: false,
    },
    mode: "all",
  });

  useEffect(() => {
    form.setFocus("firstName");
  }, [form]);

  const handleOnSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await authClient.signUp.email(
        {
          email: data.email,
          password: data.password,
          name: `${data.firstName} ${data.lastName}`,
        },
        {
          onRequest: (ctx) => console.log("loading", ctx.body),
          onSuccess: async (ctx) => {
            console.log("success", ctx.data);
            alert("สมัครสำเร็จ");
            try {
              // Submit user data after successful sign-up
              await fetch("/api/user", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  id: ctx.data.user.id,
                  birthDate: data.dob,
                  gender: data.gender,
                  phone: data.phone,
                }),
              });
              // Redirect to login page after successful submission
              router.replace("/login");
            } catch (error) {
              console.error("Error submitting user data:", error);
            }
          },
          onError: (ctx) => alert(ctx.error.message),
        }
      );
    } catch (error) {
      console.error("Error during sign-up process:", error);
    }
  };

  return (
    <>
      <p className="text-4xl">
        สมัครสมาชิกฟรี! รับสิทธิประโยชน์และส่วนลดมากมาย
      </p>
      <div className="flex w-full flex-col">
        <Form {...form}>
          <form
            className="flex flex-col space-y-2"
            onSubmit={form.handleSubmit(handleOnSubmit)}
          >
            <div className="flex flex-col gap-[8px]">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ชื่อ</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="ชื่อ" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-[8px]">
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>นามสกุล</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="นามสกุล" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-[8px]">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>อีเมล</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" placeholder="อีเมล" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col gap-[8px]">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>รหัสผ่าน</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="รหัสผ่าน"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex flex-col gap-[8px]">
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "dd/MM/yyyy")
                            ) : (
                              <span>วันเกิด</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    {/* <FormDescription>
                      Your date of birth is used to calculate your age.
                    </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-[8px]">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>เบอร์โทรศัพท์</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        placeholder="เบอร์โทรศัพท์"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex w-full flex-col  gap-16">
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel> เพศ</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                        className="flex space-x-4" // เพิ่ม space-x-4 เพื่อให้มีช่องว่างระหว่างตัวเลือก
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="male" />
                          </FormControl>
                          <FormLabel className="font-normal">ชาย</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="female" />
                          </FormControl>
                          <FormLabel className="font-normal">หญิง</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="other" />
                          </FormControl>
                          <FormLabel className="font-normal">ไม่ระบุ</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex w-full flex-col space-y-1 border-t border-t-border-primary pt-16 text-body-md-regular">
                <div className="flex w-fit flex-col gap-y-[4px] rounded-xs p-[4px]">
                  <div className="flex items-baseline">
                    <FormField
                      control={form.control}
                      name="acceptTerms"
                      render={({ field }) => (
                        <FormItem className="flex items-start space-x-2">
                          <FormControl>
                            <Checkbox
                              id="acceptTerms"
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel htmlFor="acceptTerms">
                            <span className="">
                              ฉันได้อ่านและยอมรับ
                              <a
                                href="/terms"
                                target="_blank"
                                className="privacy text-text-link underline underline-offset-[3px]"
                              >
                                ข้อกำหนดการใช้งาน
                              </a>
                              และ
                              <a
                                href="/privacy-policy"
                                target="_blank"
                                className="privacy text-text-link underline underline-offset-[3px]"
                              >
                                นโยบายความเป็นส่วนตัว
                              </a>
                              ของสเวนเซ่นส์
                            </span>
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="flex w-fit flex-col gap-y-[4px] rounded-xs p-[4px]">
                  <div className="flex items-baseline">
                    <FormField
                      control={form.control}
                      name="acceptMarketing"
                      render={({ field }) => (
                        <FormItem className="flex items-start space-x-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              id="acceptMarketing"
                            />
                          </FormControl>
                          <FormLabel htmlFor="acceptMarketing">
                            <span className="text-body-md-regular">
                              ฉันยินยอมรับข้อมูลข่าวสาร
                              กิจกรรมส่งเสริมการขายต่างๆ จากสเวนเซ่นส์และ
                              <span className="privacy text-text-link underline underline-offset-[3px]">
                                บริษัทในเครือ
                              </span>
                              โดยเราจะเก็บข้อมูลของท่านไว้เป็นความลับ
                              สามารถศึกษาเงื่อนไขหรือข้อตกลง
                              <span className="privacy text-text-link underline underline-offset-[3px]">
                                นโยบายความเป็นส่วนตัว
                              </span>
                              เพิ่มเติมได้ที่เว็บไซต์ของบริษัทฯ
                            </span>
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
            <Link href={"/register"}>
              <button
                type="submit"
                disabled={
                  !form.watch("acceptMarketing") || !form.watch("acceptTerms")
                }
                className="relative max-w-full cursor-pointer space-x-[8px] font-semibold disabled:cursor-not-allowed disabled:fill-text-disabled disabled:text-text-disabled rounded-button-md min-h-[48px] px-[16px] py-[12px] text-title-lg-medium border-none bg-background-brand fill-text-invert text-text-invert hover:bg-state-layer-brand-hovered focus:border-border-brand focus:bg-state-layer-brand-focused focus:fill-text-brand focus:text-text-brand disabled:bg-state-layer-primary-disabled gap-x-8 h-[40px] text-title-md-medium !leading-[22px] md:h-[48px] md:py-12 md:text-title-md-medium md:!leading-[22px] w-full"
              >
                <div className="flex items-center justify-center w-full">
                  <div className="flex items-center justify-center">
                    สร้างบัญชี
                  </div>
                </div>
              </button>
            </Link>
          </form>
        </Form>
      </div>
    </>
  );
}
