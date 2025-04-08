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
import { Loader } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({ message: "กรุณากรอกอีเมลให้ถูกต้อง" }).trim(),
  password: z.string().min(8, { message: "ต้องมีอย่างน้อย 8 ตัว" }).trim(),
});

interface LoginFormProps {
  onLoginSuccess: () => void; // ประเภทของฟังก์ชันที่ไม่มีพารามิเตอร์และไม่คืนค่าอะไร
}

export default function LoginForm({ onLoginSuccess }: LoginFormProps) {
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
    form.setFocus("email");
  }, [form]);

  const handleOnSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      // Start the sign-in request
      await authClient.signIn.email(
        {
          email: data.email,
          password: data.password,
        },
        {
          onRequest: (ctx) => {
            console.log("Loading:", ctx.body); // Log request body for debugging
          },
          onSuccess: async (ctx) => {
            console.log("Success:", ctx.data); // Log response data for debugging

            // Get session data (client-side)
            const { data: session } = await authClient.getSession();

            if (session?.user) {
              if (session.user.role === "admin") {
                router.replace("/product"); // Redirect to product page for admin
              } else if (session.user.role === "user") {
                router.replace("/"); // Redirect to home page for user
              } else {
                console.error("Unknown role:", session.user.role); // Handle unknown roles
              }

              // Optionally: Add other actions on success, like storing session data
              alert("เข้าสู่ระบบสำเร็จ");
              onLoginSuccess(); // Close the login form or trigger relevant action
            } else {
              console.error("Session data is missing"); // Handle missing session
              alert("เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
            }
          },
          onError: (ctx) => {
            console.error("Error:", ctx.error.message); // Log detailed error
            alert(`เข้าสู่ระบบล้มเหลว: ${ctx.error.message}`); // Display error to user
          },
        }
      );
    } catch (error) {
      // Log any unexpected errors
      console.error("Unexpected error during sign-in:", error);
      alert("เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
    }
  };

  return (
    <>
      <p className="text-4xl">
        ยินดีต้อนรับสมาชิก Swensen&apos;s เข้าสู่ระบบแล้วเริ่มสั่งไอศกรีมกันเลย!
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
            </div>
            <div className="flex flex-col gap-[8px] [&_.mur-input-wrapper]:relative [&_input]:pr-[48px] w-full">
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
            <a
              href="#"
              className="relative max-w-full cursor-pointer space-x-[8px] font-semibold disabled:cursor-not-allowed disabled:fill-text-disabled disabled:text-text-disabled rounded-button-sm min-h-[32px] px-[12px] py-[8px] sm:text-title-sm-medium rounded-sm bg-state-layer-primary-default fill-text-tertiary text-text-tertiary hover:bg-state-layer-primary-hovered focus:bg-state-layer-brand-focused disabled:bg-transparent gap-x-8 h-[32px] text-title-sm-medium !leading-[18px] w-fit"
            >
              <div className="flex items-center justify-center w-full">
                <div className="flex items-center justify-center">
                  ลืมรหัสผ่าน?
                </div>
              </div>
            </a>
            <button
              type="submit"
              className="relative max-w-full cursor-pointer space-x-[8px] font-semibold disabled:cursor-not-allowed disabled:fill-text-disabled disabled:text-text-disabled rounded-button-md min-h-[48px] px-[16px] py-[12px] text-title-lg-medium border-none bg-background-brand fill-text-invert text-text-invert hover:bg-state-layer-brand-hovered focus:border-border-brand focus:bg-state-layer-brand-focused focus:fill-text-brand focus:text-text-brand disabled:bg-state-layer-primary-disabled gap-x-8 h-[40px] text-title-md-medium !leading-[22px] md:h-[48px] md:py-12 md:text-title-md-medium md:!leading-[22px] w-full"
            >
              <div className="flex items-center justify-center w-full">
                <div className="flex items-center justify-center">
                  {form.formState.isSubmitting ? (
                    <Loader className="animate-spin" />
                  ) : (
                    "เข้าสู่ระบบ"
                  )}
                </div>
              </div>
            </button>
          </form>
        </Form>
        <div className="flex w-full items-center justify-center">
          <span className="text-body-md-regular">ยังไม่มีบัญชีใช่หรือไม่</span>
          <a
            href="/register"
            className="relative max-w-full cursor-pointer space-x-[8px] font-semibold disabled:cursor-not-allowed disabled:fill-text-disabled disabled:text-text-disabled rounded-button-sm min-h-[32px] sm:text-title-sm-medium rounded-sm bg-state-layer-primary-default fill-text-tertiary text-text-tertiary hover:bg-state-layer-primary-hovered focus:bg-state-layer-brand-focused disabled:bg-transparent gap-x-8 h-[32px] px-12 py-8 text-title-sm-medium !leading-[18px]"
          >
            <div className="flex items-center justify-center w-full">
              <div className="flex items-center justify-center">สร้างบัญชี</div>
            </div>
          </a>
        </div>
      </div>
    </>
  );
}
