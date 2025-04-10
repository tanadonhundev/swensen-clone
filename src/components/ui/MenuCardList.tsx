"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import AppCardList from "../app/AppCardList";

type MenuCard = {
  id: number;
  category_name: string;
};

type MenuCardProps = {
  menuItems: MenuCard[];
};

type ProductItem = {
  id: string;
  imageName: string;
  title: string;
  price: number;
};

export default function MenuCardList({ menuItems }: MenuCardProps) {
  const [product, setProduct] = useState<ProductItem[]>([]);

  useEffect(() => {
    const fetchProduct = async (id: number) => {
      try {
        const response = await axios.get(`/api/product/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          setProduct(response.data.product);
        }
      } catch (error) {
        setProduct([]);
        console.error("Unexpected error:", error);
      }
    };

    if (menuItems.length > 0) {
      fetchProduct(menuItems[0].id);
    }
  }, [menuItems]);

  const handleClick = async (id: number) => {
    try {
      const response = await axios.get(`/api/product/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        setProduct(response.data.product);
      }
    } catch (error) {
      setProduct([]);
      console.error("Unexpected error:", error);
    }
  };

  return (
    <>
      <div className="flex flex-wrap gap-4 ">
        {menuItems.map((item, index) => (
          <div className="flex items-center px-8 py-12 w-fit !p-0" key={index}>
            <button
              className="relative max-w-full cursor-pointer space-x-[8px] font-semibold disabled:cursor-not-allowed disabled:fill-text-disabled disabled:text-text-disabled rounded-button-sm min-h-[32px] px-[12px] py-[8px] sm:text-title-sm-medium rounded-sm border border-border-line bg-state-layer-primary-default text-text-secondary hover:bg-state-layer-secondary-hovered hover:fill-text-invert hover:text-text-invert disabled:bg-state-layer-primary-disabled gap-x-8 h-[32px] text-title-sm-medium !leading-[18px] w-max text-sm text-body-md-regular transition-all duration-300"
              type="button"
              onClick={() => handleClick(item.id)}
            >
              <div className="flex items-center justify-center w-full">
                <div className="flex items-center justify-center">
                  {item.category_name}
                </div>
              </div>
            </button>
          </div>
        ))}
      </div>
      {product.length === 0 ? (
        <div className="flex flex-col gap-24">
          <div className="flex w-full flex-col items-center gap-44">
            <div className="w-full">
              <div className="grid h-fit w-full grid-cols-2 gap-32 md:grid-cols-3 lg:grid-cols-4">
                <div className="text-xl">ไม่มีข้อมูลในระบบ</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <AppCardList products={product} />
      )}
    </>
  );
}
