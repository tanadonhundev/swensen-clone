import AppProductDisplay from "@/components/app/AppProductDisplay";
import { getProductService } from "@/services/product";

export default async function ProductPage() {
  const products = await getProductService();
  return (
    <section className="w-full overflow-x-hidden bg-surface-secondary">
      <section className="relative mx-auto w-full p-1 pt-20 pb-40 max-w-screen-2xl min-h-screen">
        <section className="relative w-full grid grid-cols-1 gap-6 h-full py-40">
          <AppProductDisplay products={products} />
        </section>
      </section>
    </section>
  );
}
