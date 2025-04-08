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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {products.map((product) => (
          <div key={product.id}>
            <div>{product.category_name}</div>
          </div>
        ))}
      </div>
    );
  };
  
  export default AppProductDisplay;
  