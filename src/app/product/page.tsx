import AppFormAddProduct from "@/components/app/AppFormAddProduct";
import AppProductDisplay from "@/components/app/AppProductDisplay";
import {
  getProductCategoryService,
  getProductService,
} from "@/services/product";

export default async function ProductPage() {
  const category = await getProductCategoryService();
  const products = await getProductService();
  return (
    <section className="w-full overflow-x-hidden bg-surface-secondary">
      <section className="relative mx-auto w-full p-1 pt-20 pb-40 max-w-screen-2xl min-h-screen justify-items-center">
        <AppFormAddProduct category={category} />
        <AppProductDisplay products={products} />
      </section>
    </section>
  );
}
