"use client";

import Image from "next/image";
import { useState } from "react";

interface PromotionCardProps {
  imageUrl: string;
  title: string;
  price: string | number;
}

export default function PromotionCard({
  imageUrl,
  title,
  price,
}: PromotionCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedQty, setSelectedQty] = useState(1);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelectQty = (qty: number) => {
    setSelectedQty(qty);
    setIsOpen(false); // ปิด dropdown หลังเลือก
  };

  return (
    <>
      <div className="relative flex h-auto w-full flex-col justify-between gap-8 overflow-hidden rounded-lg border border-solid border-border-line invisible animate-grow opacity-0">
        <div className="flex flex-col gap-4">
          <div className="flex w-full items-center justify-center rounded-lg">
            <Image src={imageUrl} alt="Card Image" width={296} height={240} />
          </div>
          <div className="absolute right-16 top-1/2 flex w-[32px] cursor-pointer items-center justify-center rounded-3xl bg-background-brand p-[6px] shadow-[0px_8px_16px_-4px_rgba(3,6,15,0.32)] lg:hidden">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className="text-[14px]"
            >
              <path
                d="M15.8334 10.8333H10.8334V15.8333H9.16669V10.8333H4.16669V9.16663H9.16669V4.16663H10.8334V9.16663H15.8334V10.8333Z"
                fill="#FFFFFF"
              ></path>
            </svg>
          </div>
          <div className="flex h-fit flex-col gap-4 p-12">
            <span className="flex w-full text-body-md-bold text-text-brand lg:text-label-large">
              <div className="flex space-x-8">
                <span className="inline-block shrink-0 whitespace-nowrap first-letter:mr-1">
                  ฿ {price}
                </span>
              </div>
            </span>
            <h3 className="line-clamp-2 w-full text-start text-title-sm-bold text-text-primary lg:text-title-md-bold">
              {title}
            </h3>
          </div>
        </div>
        <div
          className="hidden lg:flex absolute bottom-0 h-1/2 w-full from-white to-transparent 
             flex-col justify-end opacity-0 hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t"
          aria-label="product-action"
        >
          <div
            aria-label="product-cta"
            className="flex h-12 w-full overflow-hidden shadow-white"
          >
            <div
              className={`hide-scrollbar absolute z-10 flex flex-col overflow-y-auto bg-background-white shadow-sm text-title-md-medium text-text-brand transition-all duration-300 ease-in-out bottom-12 ${
                isOpen
                  ? "max-h-30 opacity-100 visible"
                  : "max-h-0 opacity-0 invisible"
              }`}
            >
              {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((qty) => (
                <button
                  key={qty}
                  onClick={() => handleSelectQty(qty)}
                  type="button"
                  className='relative block w-16 px-2 py-4 text-center after:absolute after:inset-x-0 after:bottom-0 after:mx-auto after:h-px after:w-3/4 after:border-b after:border-b-gray-100 after:content-[""] last:after:border-0 hover:bg-gray-100'
                >
                  {qty}
                </button>
              ))}
            </div>

            {/* ปุ่ม qty-selector */}
            <button
              type="button"
              aria-label="qty-selector"
              onClick={toggleDropdown}
              className="w-16 rounded-l-3xl border border-border-brand bg-background-white text-title-md-medium text-text-brand flex items-center justify-center gap-x-8 px-16 py-8 disabled:bg-state_layer-primary-disabled disabled:border-none disabled:text-text-disabled"
            >
              {selectedQty}
              <div className="rotate-0">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-icon-brand"
                >
                  <path d="M5.83398 7.9165L10.0007 12.0832L14.1673 7.9165H5.83398Z" />
                </svg>
              </div>
            </button>

            {/* ปุ่มใส่ตะกร้า */}
            <button
              aria-label="add-to-cart"
              className="bg-background-brand text-body-md-bold text-text-primary-invert 2xl:text-title-md-medium flex grow flex-wrap items-center justify-center gap-x-2 hover:bg-state-layer-brand-hover focus:border focus:border-l-0 focus:border-border-brand focus:bg-state-layer-brand-focussed focus:text-text-brand disabled:bg-state-layer-primary-disabled disabled:text-text-disabled relative overflow-hidden transition-all duration-150 ease-in-out rounded-r-3xl"
            >
              <span className="icon"></span>
              <span>ใส่ตะกร้า&nbsp;</span>
              <div className="flex space-x-8">
                <span className="inline-block shrink-0 whitespace-nowrap first-letter:mr-1">
                  ฿ {699 * selectedQty}
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
