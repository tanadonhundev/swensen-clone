"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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

const formSchema = z.object({
  firstName: z.string().min(2, { message: "กรุณากรอกอย่างน้อย 2 ตัวอักษร" }),
  lastName: z.string().min(2, { message: "กรุณากรอกอย่างน้อย 2 ตัวอักษร" }),
  email: z.string().email({ message: "กรุณากรอกอีเมลให้ถูกต้อง" }).trim(),
  password: z.string().min(8, { message: "ต้องมีอย่างน้อย 8 ตัว" }).trim(),
  phon: z
    .string()
    .min(10, { message: "กรุณากรอกเบอร์โทรศัพท์" })
    .max(10, "กรุณากรอกเบอร์โทรศัพท์"),
  dob: z.date({
    required_error: "กรุณาใส่วันเกิด",
  }),
});

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    gender: "",
  });
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
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
            console.log(ctx.data.user.id);

            try {
              // Submit user data after successful sign-up
              const response = await fetch("/api/user", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  id: ctx.data.user.id,
                  birthDate: data.dob, // Use data from form directly
                  gender: formData.gender, // Use data from form directly
                  phone: data.phon,
                }),
              });

              const responseData = await response.json();
              console.log(responseData); // Handle the response here

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

  // const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
                    <FormLabel>อีเมล</FormLabel>
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
                name="phon"
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
              <section>
                <label className="text-label-medium text-text-primary">
                  เพศ
                </label>
                <span className="text-text-error">*</span>
              </section>
              <div className="w-full">
                <div className="flex space-x-32 md:space-x-36">
                  <div className="flex flex-col gap-[8px]">
                    <fieldset className="flex flex-wrap gap-[16px]">
                      {[
                        { label: "ชาย", value: "male" },
                        { label: "หญิง", value: "female" },
                        { label: "ไม่ระบุ", value: "other" },
                      ].map((item, index) => (
                        <label
                          key={index}
                          className="[&_.ri-label]:text-title-sm-medium [&_.ri-supporting-text]:text-body-sm-regular flex items-center gap-x-[8px] cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="gender"
                            value={item.value}
                            checked={formData.gender === item.value}
                            onChange={handleChange}
                            className="relative size-[16px] cursor-pointer appearance-none rounded-full border border-border-primary hover:bg-state-layer-primary-focused focus:border-none focus:bg-state-layer-primary-focused disabled:cursor-not-allowed disabled:border-none disabled:bg-state-layer-primary-disabled before:content[''] before:absolute before:left-1/2 before:top-1/2 before:size-full before:-translate-y-1/2 before:block before:-translate-x-1/2 before:rounded-full before:opacity-0 before:transition-opacity hover:before:[box-shadow:0px_0px_0px_2px_rgba(234,236,240,1)] focus:before:bg-state-layer-primary-focused hover:before:bg-state-layer-brand-hover hover:before:shadow-3xl checked:!border-none checked:hover:checked:bg-transparent checked:focus:bg-transparent checked:before:bg-background-brand checked:before:opacity-100 checked:focus:before:border checked:focus:before:border-border-brand checked:focus:before:bg-state-layer-brand-focused checked:disabled:before:bg-state-layer-primary-disabled after:content[''] after:absolute after:left-1/2 after:top-1/2 after:size-[6px] after:-translate-y-1/2 after:block after:-translate-x-1/2 after:rounded-full after:opacity-0 after:transition-opacity disabled:after:bg-icon-secondary checked:after:bg-icon-invert checked:after:opacity-100 checked:focus:after:bg-icon-brand"
                          />
                          <div className="flex flex-col gap-y-[4px] text-text-primary">
                            <div className="ri-label">{item.label}</div>
                          </div>
                        </label>
                      ))}
                    </fieldset>
                  </div>
                </div>
              </div>
              <div className="flex w-full flex-col space-y-1 border-t border-t-border-primary pt-16 text-body-md-regular">
                <div className="flex w-fit flex-col gap-y-[4px] rounded-xs p-[4px]">
                  <div className="flex items-baseline">
                    <label className="relative flex cursor-pointer">
                      <input
                        type="checkbox"
                        className="peer relative size-[16px] cursor-pointer appearance-none rounded-xs border border-border-primary transition-colors hover:bg-state-layer-primary-hovered focus:border-transparent focus:bg-state-layer-primary-focused disabled:cursor-not-allowed disabled:border-0 disabled:bg-state-layer-primary-disabled checked:border-none checked:bg-background-brand checked:hover:bg-background-brand checked:hover:outline checked:hover:outline-state-layer-primary-hovered checked:focus:border-solid checked:focus:border-border-brand checked:focus:bg-state-layer-brand-focused checked:disabled:border-none checked:disabled:bg-state-layer-primary-disabled checked:disabled:outline-none indeterminate:border-none indeterminate:bg-background-brand indeterminate:hover:bg-background-brand indeterminate:hover:outline indeterminate:hover:outline-state-layer-primary-hovered indeterminate:focus:border-solid indeterminate:focus:border-border-brand indeterminate:focus:bg-state-layer-brand-focused indeterminate:disabled:border-none indeterminate:disabled:bg-state-layer-primary-disabled indeterminate:disabled:outline-none flex flex-row"
                      />
                    </label>
                    <span className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity peer-checked:block text-icon-invert peer-checked:text-icon-invert peer-checked:opacity-100 peer-checked:peer-focus:text-icon-brand peer-checked:peer-disabled:text-icon-disabled">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-[12px]"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        stroke="currentColor"
                      >
                        <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
                      </svg>
                    </span>
                    <span className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity peer-indeterminate:block text-icon-invert peer-indeterminate:text-icon-invert peer-indeterminate:opacity-100 peer-indeterminate:peer-focus:text-icon-brand peer-indeterminate:peer-disabled:text-icon-disabled">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-[12px]"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        stroke="currentColor"
                      >
                        <rect
                          x="3"
                          y="9"
                          width="14"
                          height="2"
                          rx="1"
                          fill="currentColor"
                        ></rect>
                      </svg>
                    </span>
                    <label className="mur-checkbox-label cursor-pointer pl-[8px]  !text-text-error">
                      <span className="mr-[8px]">
                        <span className="w-full text-body-md-regular">
                          ฉันได้อ่านและยอมรับ
                          <span className="privacy text-text-link underline underline-offset-[3px]">
                            ข้อกำหนดการใช้งาน
                          </span>
                          และ
                          <span className="privacy text-text-link underline underline-offset-[3px]">
                            นโยบายความเป็นส่วนตัว
                          </span>
                          ของสเวนเซ่นส์
                        </span>
                      </span>
                    </label>
                  </div>
                </div>
                <div className="flex w-fit flex-col gap-y-[4px] rounded-xs p-[4px]">
                  <div className="flex items-baseline">
                    <label className="relative flex cursor-pointer">
                      <input
                        type="checkbox"
                        className="peer relative size-[16px] cursor-pointer appearance-none rounded-xs border border-border-primary transition-colors hover:bg-state-layer-primary-hovered focus:border-transparent focus:bg-state-layer-primary-focused disabled:cursor-not-allowed disabled:border-0 disabled:bg-state-layer-primary-disabled checked:border-none checked:bg-background-brand checked:hover:bg-background-brand checked:hover:outline checked:hover:outline-state-layer-primary-hovered checked:focus:border-solid checked:focus:border-border-brand checked:focus:bg-state-layer-brand-focused checked:disabled:border-none checked:disabled:bg-state-layer-primary-disabled checked:disabled:outline-none indeterminate:border-none indeterminate:bg-background-brand indeterminate:hover:bg-background-brand indeterminate:hover:outline indeterminate:hover:outline-state-layer-primary-hovered indeterminate:focus:border-solid indeterminate:focus:border-border-brand indeterminate:focus:bg-state-layer-brand-focused indeterminate:disabled:border-none indeterminate:disabled:bg-state-layer-primary-disabled indeterminate:disabled:outline-none flex flex-row"
                      />
                    </label>
                    <span className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity peer-checked:block text-icon-invert peer-checked:text-icon-invert peer-checked:opacity-100 peer-checked:peer-focus:text-icon-brand peer-checked:peer-disabled:text-icon-disabled">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-[12px]"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        stroke="currentColor"
                      >
                        <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
                      </svg>
                    </span>
                    <span className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity peer-indeterminate:block text-icon-invert peer-indeterminate:text-icon-invert peer-indeterminate:opacity-100 peer-indeterminate:peer-focus:text-icon-brand peer-indeterminate:peer-disabled:text-icon-disabled">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-[12px]"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        stroke="currentColor"
                      >
                        <rect
                          x="3"
                          y="9"
                          width="14"
                          height="2"
                          rx="1"
                          fill="currentColor"
                        ></rect>
                      </svg>
                    </span>
                    <label className="mur-checkbox-label cursor-pointer pl-[8px]  !text-text-error">
                      <span className="mr-[8px]">
                        <span className="w-full text-body-md-regular">
                          ฉันยินยอมรับข้อมูลข่าวสาร กิจกรรมส่งเสริมการขายต่างๆ
                          จากสเวนเซ่นส์และ
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
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="relative max-w-full cursor-pointer space-x-[8px] font-semibold disabled:cursor-not-allowed disabled:fill-text-disabled disabled:text-text-disabled rounded-button-md min-h-[48px] px-[16px] py-[12px] text-title-lg-medium border-none bg-background-brand fill-text-invert text-text-invert hover:bg-state-layer-brand-hovered focus:border-border-brand focus:bg-state-layer-brand-focused focus:fill-text-brand focus:text-text-brand disabled:bg-state-layer-primary-disabled gap-x-8 h-[40px] text-title-md-medium !leading-[22px] md:h-[48px] md:py-12 md:text-title-md-medium md:!leading-[22px] w-full"
            >
              <div className="flex items-center justify-center w-full">
                <div className="flex items-center justify-center">
                  สร้างบัญชี
                </div>
              </div>
            </button>
          </form>
        </Form>
      </div>
    </>
  );
}
