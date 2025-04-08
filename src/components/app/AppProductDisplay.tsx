"use client";

type Product = {
  id: number;
  createdAt: Date | null;
  updatedAt: Date | null;
  category_name: string;
  productItems: {
    id: number;
    createdAt: Date | null;
    updatedAt: Date | null;
    categoryId: number;
    description: string | null;
    price: string;
    imageName: string;
  }[];
};

type ProductListProps = {
  products: Product[];
};

const AppProductDisplay = ({ products }: ProductListProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-xl shadow">
            <h3 className="text-lg font-bold mb-2">{product.category_name}</h3>
            {product.productItems.map((item) => (
              <div key={item.id} className="border-t py-2">
                <div>📦 {item.description}</div>
                <div>💰 {item.price} บาท</div>
                <div>🖼️ {item.imageName}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default AppProductDisplay;
