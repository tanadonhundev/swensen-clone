"use client";
import { useState } from "react";

export default function LoginForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  return (
    <>
      <p className="text-4xl">
        ยินดีต้อนรับสมาชิก Swensen&apos;s เข้าสู่ระบบแล้วเริ่มสั่งไอศกรีมกันเลย!
      </p>
      <div className="flex w-full flex-col">
        <form className="flex flex-col space-y-2">
          <div className="flex flex-col gap-[8px]">
            <label className="mur-form-label flex gap-[8px] text-label-medium text-text-primary">
              อีเมล
              <span className="text-text-error">*</span>
            </label>
            <div className="mur-input-wrapper flex w-full">
              <input
                type="email"
                placeholder="อีเมล"
                className="h-[42px] w-full grow rounded-sm border bg-state-layer-primary-default py-[8px] text-body-md-regular placeholder:text-text-secondary focus:outline-border-primary hover:bg-state-layer-primary-hovered disabled:cursor-not-allowed disabled:border-border-line disabled:bg-state-layer-primary-disabled disabled:placeholder:text-text-disabled focus:border-transparent focus:shadow-input-outline-primary-sm border-border-line hover:border-border-primary px-[16px]"
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
                className="h-[42px] w-full grow rounded-sm border bg-state-layer-primary-default py-[8px] text-body-md-regular placeholder:text-text-secondary focus:outline-border-primary hover:bg-state-layer-primary-hovered disabled:cursor-not-allowed disabled:border-border-line disabled:bg-state-layer-primary-disabled disabled:placeholder:text-text-disabled focus:border-transparent focus:shadow-input-outline-primary-sm border-border-line hover:border-border-primary px-[16px]"
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
                เข้าสู่ระบบ
              </div>
            </div>
          </button>
        </form>
        <div className="flex w-full items-center justify-center">
          <span className="text-body-md-regular">ยังไม่มีบัญชีใช่หรือไม่</span>
          <a
            href=""
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
