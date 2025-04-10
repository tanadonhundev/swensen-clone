import Image from "next/image";
import MenuCardList from "../ui/MenuCardList";
import { getProductCategoryService } from "@/services/product";
import PromotionCard from "../ui/PromotionCard";

const promotions = [
  {
    imageUrl: "/images/500641322.webp",
    title: "โปรโมชัน มะม่วงอกร่องทอง 3 ปอนด์ ราคาพิเศษ 699.-",
    price: 699,
  },
  {
    imageUrl: "/images/500641324.webp",
    title: "เค้กช็อกโกแลตลาวา ซื้อ 1 แถม 1",
    price: 699,
  },
  {
    imageUrl: "/images/500641711.webp",
    title: "ไอศกรีมรวมรส 5 ถ้วยเพียง 499.-",
    price: 699,
  },
  {
    imageUrl: "/images/500641712.webp",
    title: "ไอศกรีมรวมรส 5 ถ้วยเพียง 499.-",
    price: 699,
  },
  {
    imageUrl: "/images/636083_5.webp",
    title: "ไอศกรีมรวมรส 5 ถ้วยเพียง 499.-",
    price: 699,
  },
  {
    imageUrl: "/images/636153.webp",
    title: "ไอศกรีมรวมรส 5 ถ้วยเพียง 499.-",
    price: 699,
  },
];

export default async function AppContent() {
  const category = await getProductCategoryService();
  return (
    <main>
      <section className="h-max w-full md:min-h-[calc(100vh-110px-88px)]">
        <section className="container m-auto max-w-[1200px] px-24 inner-container h-full space-y-24 py-40">
          <div className="flex h-fit scroll-mt-[120px] flex-col items-start gap-16 md:h-[56px] md:flex-row md:items-center md:gap-24">
            <div className="flex text-nowrap text-title-md-bold">ไปส่งที่:</div>
            <div className="w-full">
              <div className="flex w-full items-center justify-between gap-8 rounded-sm border border-border-line p-12 bg-background-secondary cursor-pointer">
                <div className="flex max-w-full flex-nowrap items-center gap-x-8">
                  <Image
                    src="/images/location-icon.svg"
                    alt="location"
                    width={16}
                    height={16}
                  />
                  <div className="relative line-clamp-1 flex grow text-left text-title-md-medium">
                    เลือกที่อยู่สำหรับจัดส่ง
                  </div>
                </div>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-[14px]"
                >
                  <g
                    id="drop-down-triangle"
                    data-sentry-element="g"
                    data-sentry-source-file="DropDownTriangle.tsx"
                  >
                    <path
                      id="Vector"
                      d="M5.83398 7.9165L10.0007 12.0832L14.1673 7.9165H5.83398Z"
                      fill="#787878"
                    ></path>
                  </g>
                </svg>
              </div>
            </div>
          </div>
          <div className="relative w-full !rounded-md">
            <div className="relative">
              <div className="w-full overflow-hidden">
                <div className="flex -ml-4">
                  <div
                    role="group"
                    className="min-w-0 shrink-0 grow-0 basis-full pl-4"
                  >
                    <Image
                      src="/images/banner_sw-banner.webp"
                      alt="hero-banner-0"
                      width={1280}
                      height={320}
                      className="object-fit aspect-[3/1] w-full rounded-md sm:aspect-[4/1] 2xl:rounded-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 flex justify-center p-4">
            <span className="transition-color mx-1 inline-block size-2 cursor-pointer rounded-full border duration-200 hover:opacity-75  md:size-[12px] border-border-brand bg-background-brand"></span>
          </div>
          {/* Promotion */}
          <div className="flex flex-col gap-24">
            <div className="flex w-full flex-col items-center gap-44">
              <div className="w-full">
                <p className="text-4xl">โปรโมชัน</p>
                <div className="grid h-fit w-full grid-cols-2 gap-32 md:grid-cols-3 lg:grid-cols-4">
                  {promotions.map((promo, index) => (
                    <PromotionCard
                      key={index}
                      imageUrl={promo.imageUrl}
                      title={promo.title}
                      price={promo.price}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between ">
            <p className="text-4xl">เมนูจัดส่ง</p>
          </div>
          <div className="flex w-full flex-col items-center gap-44">
            <div className="flex w-full items-center gap-16  sm:flex-wrap pb-4 sm:pb-0 !px-0 gap-x-[12px]">
              <MenuCardList menuItems={category} />
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
