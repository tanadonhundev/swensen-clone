"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    birthDate: "",
    phone: "",
    gender: "",
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  // const [gender, setGender] = useState("");
  // console.log(gender);

  const togglePasswordVisibility = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setIsPasswordVisible((prevState: any) => !prevState);
  };

  const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignUp = async () => {
    await authClient.signUp.email(
      {
        email: formData.email,
        password: formData.password,
        name: `${formData.firstName} ${formData.lastName}`,
      },
      {
        onRequest: (ctx) => console.log("loading", ctx.body),
        onSuccess: async (ctx) => {
          // Make this async
          console.log("success", ctx.data);
          alert("สมัครสำเร็จ");
          console.log(ctx.data.user.id);

          try {
            const response = await fetch("/api/user", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id: ctx.data.user.id,
                birthDate: formData.birthDate,
                gender: formData.gender,
                phone: formData.phone,
              }),
            });

            const data = await response.json();
            console.log(data); // You can log or handle the response here
          } catch (error) {
            console.error("Error submitting form:", error);
          }
          return;
          router.replace("/login");
        },
        onError: (ctx) => alert(ctx.error.message),
      }
    );
  };

  return (
    <>
      <p className="text-4xl">
        สมัครสมาชิกฟรี! รับสิทธิประโยชน์และส่วนลดมากมาย
      </p>
      <div className="flex w-full flex-col">
        <form
          className="flex flex-col space-y-2"
          onSubmit={(e) => {
            e.preventDefault();
            handleSignUp();
          }}
        >
          <div className="flex flex-col gap-[8px]">
            <label className="mur-form-label flex gap-[8px] text-label-medium text-text-primary">
              ชื่อ
              <span className="text-text-error">*</span>
            </label>
            <div className="mur-input-wrapper flex w-full">
              <input
                type="text"
                name="firstName"
                placeholder="ชื่อ"
                className="h-[42px] w-full grow rounded-sm border bg-state-layer-primary-default py-[8px] text-body-md-regular placeholder:text-text-secondary focus:outline-border-primary hover:bg-state-layer-primary-hovered disabled:cursor-not-allowed disabled:border-border-line disabled:bg-state-layer-primary-disabled disabled:placeholder:text-text-disabled focus:border-transparent focus:shadow-input-outline-primary-sm border-border-line hover:border-border-primary px-[16px]"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex flex-col gap-[8px]">
            <label className="mur-form-label flex gap-[8px] text-label-medium text-text-primary">
              นามสกุล
              <span className="text-text-error">*</span>
            </label>
            <div className="mur-input-wrapper flex w-full">
              <input
                type="text"
                name="lastName"
                placeholder="นามสกุล"
                className="h-[42px] w-full grow rounded-sm border bg-state-layer-primary-default py-[8px] text-body-md-regular placeholder:text-text-secondary focus:outline-border-primary hover:bg-state-layer-primary-hovered disabled:cursor-not-allowed disabled:border-border-line disabled:bg-state-layer-primary-disabled disabled:placeholder:text-text-disabled focus:border-transparent focus:shadow-input-outline-primary-sm border-border-line hover:border-border-primary px-[16px]"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex flex-col gap-[8px]">
            <label className="mur-form-label flex gap-[8px] text-label-medium text-text-primary">
              อีเมล
              <span className="text-text-error">*</span>
            </label>
            <div className="mur-input-wrapper flex w-full">
              <input
                type="email"
                name="email"
                placeholder="อีเมล"
                className="h-[42px] w-full grow rounded-sm border bg-state-layer-primary-default py-[8px] text-body-md-regular placeholder:text-text-secondary focus:outline-border-primary hover:bg-state-layer-primary-hovered disabled:cursor-not-allowed disabled:border-border-line disabled:bg-state-layer-primary-disabled disabled:placeholder:text-text-disabled focus:border-transparent focus:shadow-input-outline-primary-sm border-border-line hover:border-border-primary px-[16px]"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex flex-col gap-[8px] [&_.mur-input-wrapper]:relative [&_input]:pr-[48px] w-full">
            <label className="mur-form-label flex gap-[8px] text-label-medium text-text-primary">
              รหัสผ่าน
              <span className="text-text-error">*</span>
            </label>
            <div className="mur-input-wrapper flex w-full">
              <input
                type={isPasswordVisible ? "text" : "password"}
                name="password"
                placeholder="รหัสผ่าน"
                className="h-[42px] w-full grow rounded-sm border bg-state-layer-primary-default py-[8px] text-body-md-regular placeholder:text-text-secondary focus:outline-border-primary hover:bg-state-layer-primary-hovered disabled:cursor-not-allowed disabled:border-border-line disabled:bg-state-layer-primary-disabled disabled:placeholder:text-text-disabled focus:border-transparent focus:shadow-input-outline-primary-sm border-border-line hover:border-border-primary px-[16px]"
                value={formData.password}
                onChange={handleChange}
              />
              <svg
                onClick={togglePasswordVisibility}
                stroke="currentColor"
                fill="currentColor"
                viewBox="0 0 256 256"
                color="#1D2939"
                height="20"
                width="20"
                className="cursor-pointer absolute right-[16px] top-1/2 -translate-y-1/2 z-0"
              >
                {isPasswordVisible ? (
                  <path d="M53.92,34.62A8,8,0,1,0,42.08,45.38L61.32,66.55C25,88.84,9.38,123.2,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208a127.11,127.11,0,0,0,52.07-10.83l22,24.21a8,8,0,1,0,11.84-10.76Zm47.33,75.84,41.67,45.85a32,32,0,0,1-41.67-45.85ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.16,133.16,0,0,1,25,128c4.69-8.79,19.66-33.39,47.35-49.38l18,19.75a48,48,0,0,0,63.66,70l14.73,16.2A112,112,0,0,1,128,192Zm6-95.43a8,8,0,0,1,3-15.72,48.16,48.16,0,0,1,38.77,42.64,8,8,0,0,1-7.22,8.71,6.39,6.39,0,0,1-.75,0,8,8,0,0,1-8-7.26A32.09,32.09,0,0,0,134,96.57Zm113.28,34.69c-.42.94-10.55,23.37-33.36,43.8a8,8,0,1,1-10.67-11.92A132.77,132.77,0,0,0,231.05,128a133.15,133.15,0,0,0-23.12-30.77C185.67,75.19,158.78,64,128,64a118.37,118.37,0,0,0-19.36,1.57A8,8,0,1,1,106,49.79,134,134,0,0,1,128,48c34.88,0,66.57,13.26,91.66,38.35,18.83,18.83,27.3,37.62,27.65,38.41A8,8,0,0,1,247.31,131.26Z"></path>
                ) : (
                  <path d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z"></path>
                )}
              </svg>
            </div>
          </div>
          <div className="flex flex-col gap-[8px]">
            <label className="mur-form-label flex gap-[8px] text-label-medium text-text-primary">
              วันเกิด
              <span className="text-text-error">*</span>
            </label>
            <div className="mur-input-wrapper flex w-full">
              <input
                type="date"
                name="birthDate"
                className="h-[42px] w-full grow rounded-sm border bg-state-layer-primary-default py-[8px] text-body-md-regular placeholder:text-text-secondary focus:outline-border-primary hover:bg-state-layer-primary-hovered disabled:cursor-not-allowed disabled:border-border-line disabled:bg-state-layer-primary-disabled disabled:placeholder:text-text-disabled focus:border-transparent focus:shadow-input-outline-primary-sm border-border-line hover:border-border-primary px-[16px]"
                value={formData.birthDate}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex flex-col gap-[8px]">
            <label className="mur-form-label flex gap-[8px] text-label-medium text-text-primary">
              เบอร์โทรศัพท์
              <span className="text-text-error">*</span>
            </label>
            <div className="mur-input-wrapper flex w-full">
              <input
                type="number"
                name="phone"
                placeholder="เบอร์โทรศัพท์"
                className="h-[42px] w-full grow rounded-sm border bg-state-layer-primary-default py-[8px] text-body-md-regular placeholder:text-text-secondary focus:outline-border-primary hover:bg-state-layer-primary-hovered disabled:cursor-not-allowed disabled:border-border-line disabled:bg-state-layer-primary-disabled disabled:placeholder:text-text-disabled focus:border-transparent focus:shadow-input-outline-primary-sm border-border-line hover:border-border-primary px-[16px]"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex w-full flex-col  gap-16">
            <section>
              <label className="text-label-medium text-text-primary">เพศ</label>
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
              <div className="flex items-center justify-center">สร้างบัญชี</div>
            </div>
          </button>
        </form>
      </div>
    </>
  );
}
