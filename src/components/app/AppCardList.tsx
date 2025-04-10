import PromotionCard from "../ui/PromotionCard";

type ProductItem = {
  id: string;
  imageName: string;
  title: string;
  price: number;
};

type AppCardListProps = {
  products: ProductItem[];
};

export default function AppCardList({ products }: AppCardListProps) {
  return (
    <div className="flex flex-col gap-24">
      <div className="flex w-full flex-col items-center gap-44">
        <div className="w-full">
          <p className="text-4xl">โปรโมชัน</p>
          <div className="grid h-fit w-full grid-cols-2 gap-32 md:grid-cols-3 lg:grid-cols-4">
            {products.map((item) => (
              <PromotionCard
                key={item.id}
                imageUrl={`/uploads/${item.imageName}`}
                title={item.title}
                price={item.price}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
