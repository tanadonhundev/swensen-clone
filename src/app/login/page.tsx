import Image from "next/image";
import LoginForm from "../components/app/LoginForm";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <section className="relative mx-auto w-full p-24 pb-40 max-w-screen-2xl min-h-screen !py-0">
        <section className="relative w-full xl:min-h-screen grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12 lg:gap-32 h-full py-40 lg:py-40">
          <div className="col-span-1 hidden lg:block"></div>
          <div className="col-span-full lg:col-span-5">
            <div className="w-full lg:space-y-24">
              <div className="text-text_primary min-h-[40px] items-center justify-between hidden lg:flex">
                <button className="relative max-w-full cursor-pointer space-x-[8px] font-semibold disabled:cursor-not-allowed disabled:fill-text-disabled disabled:text-text-disabled rounded-button-md min-h-[48px] px-[16px] py-[12px] text-title-lg-medium rounded-sm fill-text-primary text-text-primary hover:bg-state-layer-primary-hovered focus:bg-state-layer-brand-focused disabled:bg-transparent gap-x-8 h-[40px] text-title-md-medium !leading-[22px] md:h-[48px] md:py-12 md:text-title-md-medium md:!leading-[22px] flex w-fit items-center bg-transparent text-text-primary lg:block md:hidden">
                  <div className="items-center justify-center flex w-fit gap-8">
                    <div className="items-center justify-center flex w-fit gap-8">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 320 512"
                        height="16px"
                        width="16px"
                      >
                        <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"></path>
                      </svg>
                      <Link href="/">
                        <span className="text-title-sm-medium text-text-primary md:text-title-md-medium">
                          กลับ
                        </span>
                      </Link>
                    </div>
                  </div>
                </button>
                <section className="flex items-center space-x-8">
                  <span className="text-text_primary text-right text-title-md-medium">
                    ยังไม่มีบัญชีใช่หรือไม่
                  </span>
                  <button className="relative max-w-full cursor-pointer space-x-[8px] font-semibold disabled:cursor-not-allowed disabled:fill-text-disabled disabled:text-text-disabled rounded-button-md min-h-[48px] px-[16px] py-[12px] text-title-lg-medium border border-border-brand bg-state-layer-primary-default fill-text-brand text-text-brand hover:bg-state-layer-brand-hovered hover:fill-text-invert hover:text-text-invert focus:bg-state-layer-brand-focused focus:fill-text-brand focus:text-text-brand disabled:!border-0 disabled:bg-state-layer-primary-disabled gap-x-8 h-[40px] text-title-md-medium !leading-[22px] md:h-[48px] md:py-12 md:text-title-md-medium md:!leading-[22px]">
                    <div className="flex items-center justify-center w-full">
                      <div className="flex items-center justify-center">
                        สร้างบัญชี
                      </div>
                    </div>
                  </button>
                </section>
              </div>
              <section className="mx-auto size-full rounded-[10px] bg-background-white p-24 shadow-xs md:p-40 flex h-full flex-col space-y-16">
                <button className="relative max-w-full cursor-pointer space-x-[8px] font-semibold disabled:cursor-not-allowed disabled:fill-text-disabled disabled:text-text-disabled rounded-button-md min-h-[48px] px-[16px] py-[12px] text-title-lg-medium rounded-sm fill-text-primary text-text-primary hover:bg-state-layer-primary-hovered focus:bg-state-layer-brand-focused disabled:bg-transparent gap-x-8 h-[40px] text-title-md-medium !leading-[22px] lg:h-[48px] lg:py-12 lg:text-title-md-medium lg:!leading-[22px] w-fit items-center bg-transparent text-text-primary lg:hidden block">
                  <div className="items-center justify-center flex w-fit gap-8">
                    <div className="items-center justify-center flex w-fit gap-8">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 320 512"
                        height="16px"
                        width="16px"
                      >
                        <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"></path>
                      </svg>
                      <Link href={"/"}>
                        <span className="text-title-sm-medium text-text-primary lg:text-title-md-medium">
                          กลับ
                        </span>
                      </Link>
                    </div>
                  </div>
                </button>
                <LoginForm />
              </section>
            </div>
          </div>
          <div className="col-span-1 hidden lg:block"></div>
          <div className="absolute inset-y-0 right-0 hidden h-full min-h-screen w-2/5 shrink-0 grow md:col-span-5 lg:block">
            <Image
              src="/images/register-banner.webp"
              alt="bg-banner"
              layout="fill"
              className="size-full object-cover"
            />
          </div>
        </section>
      </section>
    </>
  );
}
