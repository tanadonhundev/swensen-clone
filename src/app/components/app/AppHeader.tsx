"use client";

import { useState } from "react";
import Image from "next/image";

export const AppHeader = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };
  return (
    <header className="site-header sticky top-0 z-20 hidden h-[80px] w-full gap-8 bg-background-white px-16 [box-shadow:0_2px_15px_rgba(0,0,0,.05)] lg:flex">
      <section className="relative mx-auto w-full max-w-screen-2xl px-12 pb-4 flex justify-center">
        <div className="felx-rows flex w-full items-center justify-center">
          <div className="logo !my-0 !ml-0 !mr-24 flex h-full shrink-0 items-center bg-none">
            <a>
              <Image
                src="/images/desktop-header-logo.svg"
                alt="Swensen's Logo"
                width={152}
                height={40}
                className="py-4 pl-4"
              />
            </a>
          </div>
          <div className="header-right inline-flex w-full shrink items-center justify-end space-x-16">
            <button
              className="relative max-w-full cursor-pointer space-x-[8px] font-semibold disabled:cursor-not-allowed disabled:fill-text-disabled disabled:text-text-disabled !p-0 rounded-button-md min-h-[48px] px-[16px] py-[12px] text-title-lg-medium gap-x-8 h-[40px] text-title-md-medium !leading-[22px] md:h-[48px] md:py-12 md:text-title-md-medium md:!leading-[22px] ml-2 size-[48px]"
              type="button"
            >
              <div className="flex items-center justify-center w-full">
                <div className="flex items-center justify-center">
                  <div className="relative flex items-center justify-center">
                    <Image
                      src="/images/mobile-cart.svg"
                      alt="cart icon"
                      width={32}
                      height={32}
                      className="flex shrink-0 hover:drop-shadow-lg"
                    ></Image>
                  </div>
                </div>
              </div>
            </button>
            {!isCartOpen && (
              <div
                className="fixed right-0 top-1/2 z-20 hidden h-fit -translate-y-1/2 lg:flex items-center justify-center"
                onClick={toggleCart}
              >
                <div className="relative flex h-[110px] w-[88px] flex-col items-center justify-center gap-1 rounded-l-lg px-8 py-16 bg-background-brand shadow-[0px_8px_16px_-4px_rgba(3,6,15,0.32)] cursor-pointer transition-all hover:w-[100px]">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-[14px]"
                  >
                    <path
                      d="M18 6H16C16 3.79 14.21 2 12 2C9.79 2 8 3.79 8 6H6C4.9 6 4 6.9 4 8V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8C20 6.9 19.1 6 18 6ZM10 10C10 10.55 9.55 11 9 11C8.45 11 8 10.55 8 10V8H10V10ZM12 4C13.1 4 14 4.9 14 6H10C10 4.9 10.9 4 12 4ZM16 10C16 10.55 15.55 11 15 11C14.45 11 14 10.55 14 10V8H16V10Z"
                      fill="white"
                    ></path>
                  </svg>
                  <div className="text-white text-center text-title-sm-bold text-text-invert">
                    ตะกร้า
                  </div>
                </div>
              </div>
            )}
            <div className="py-4">
              <button
                className="relative max-w-full cursor-pointer space-x-[8px] font-semibold disabled:cursor-not-allowed disabled:fill-text-disabled disabled:text-text-disabled rounded-button-md min-h-[48px] px-[16px] py-[12px] text-title-lg-medium border-none bg-background-brand fill-text-invert text-text-invert hover:bg-state-layer-brand-hovered focus:border-border-brand focus:bg-state-layer-brand-focused focus:fill-text-brand focus:text-text-brand disabled:bg-state-layer-primary-disabled gap-x-8 h-[40px] text-title-md-medium !leading-[22px] md:h-[48px] md:py-12 md:text-title-md-medium md:!leading-[22px] shrink-0 pt-4"
                type="button"
              >
                <div className="flex items-center justify-center w-full">
                  <div className="flex items-center justify-center">
                    เข้าสู่ระบบ / ลงทะเบียน
                  </div>
                </div>
              </button>
            </div>
            {isCartOpen && (
              <div
                className="fixed bottom-24 right-0 top-[104px] z-10 my-auto hidden lg:flex lg:max-h-[90vh] 2xl:max-h-[75vh] items-center justify-center"
                data-sentry-element="Transition"
              >
                <div className="h-full w-[352px] rounded-l-lg bg-surface-primary pb-16 shadow-md relative my-24 flex flex-col gap-y-4">
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="absolute -left-8 -top-8 z-10 flex size-[24px] shrink-0 cursor-pointer items-center rounded-full bg-background-white text-icon-primary"
                  >
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 16 16"
                      className="size-[24px]"
                      width="1em"
                      height="1em"
                    >
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"></path>
                    </svg>
                  </button>
                  <div className="relative flex h-full flex-col overflow-y-hidden">
                    <div className="flex size-full min-h-[400px] flex-col items-center justify-center gap-y-4 text-center text-body-md-regular text-text-disabled px-16">
                      <svg
                        width="56"
                        height="56"
                        viewBox="0 0 56 56"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-[14px]"
                      >
                        <path
                          d="M30.736 22.1667C32.0193 22.1667 33.0693 21.1167 33.0693 19.8333V15.1667H37.736C39.0193 15.1667 40.0693 14.1167 40.0693 12.8333C40.0693 11.55 39.0193 10.5 37.736 10.5H33.0693V5.83333C33.0693 4.55 32.0193 3.5 30.736 3.5C29.4527 3.5 28.4027 4.55 28.4027 5.83333V10.5H23.736C22.4527 10.5 21.4027 11.55 21.4027 12.8333C21.4027 14.1167 22.4527 15.1667 23.736 15.1667H28.4027V19.8333C28.4027 21.1167 29.4527 22.1667 30.736 22.1667ZM19.0693 43.1667C16.5027 43.1667 14.426 45.2667 14.426 47.8333C14.426 50.4 16.5027 52.5 19.0693 52.5C21.636 52.5 23.736 50.4 23.736 47.8333C23.736 45.2667 21.636 43.1667 19.0693 43.1667ZM42.4027 43.1667C39.836 43.1667 37.7593 45.2667 37.7593 47.8333C37.7593 50.4 39.836 52.5 42.4027 52.5C44.9693 52.5 47.0693 50.4 47.0693 47.8333C47.0693 45.2667 44.9693 43.1667 42.4027 43.1667ZM21.636 31.5H39.0193C40.7693 31.5 42.3093 30.5433 43.1027 29.0967L50.6627 14.77C51.246 13.65 50.8493 12.25 49.7293 11.6433C48.586 11.0133 47.1627 11.4567 46.556 12.6L39.0193 26.8333H22.6393L12.6993 5.83333H7.40267C6.11934 5.83333 5.06934 6.88333 5.06934 8.16667C5.06934 9.45 6.11934 10.5 7.40267 10.5H9.736L18.136 28.21L14.986 33.9033C13.2827 37.03 15.5227 40.8333 19.0693 40.8333H44.736C46.0193 40.8333 47.0693 39.7833 47.0693 38.5C47.0693 37.2167 46.0193 36.1667 44.736 36.1667H19.0693L21.636 31.5Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                      <div>เริ่มเพิ่มสินค้าลงในรถเข็นของคุณ</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <button
              type="button"
              aria-expanded="false"
              data-state="closed"
              className="focus-visible:outline-none"
            >
              <div className="flex h-[48px] flex-row items-center space-x-8 uppercase">
                <Image
                  src="/images/change-language.svg"
                  alt="cart icon"
                  width={16}
                  height={16}
                ></Image>
                <span className="text-title-md-medium text-text-primary">
                  th
                </span>
              </div>
            </button>
          </div>
        </div>
      </section>
    </header>
  );
};
