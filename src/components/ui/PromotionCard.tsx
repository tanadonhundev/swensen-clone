"use client";

import Image from "next/image";

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
      </div>
    </>
  );
}
