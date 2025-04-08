import AppFormAddCategory from "@/components/app/AppFormAddCategory";

export default function Page() {
  return (
    <section className="w-full overflow-x-hidden bg-surface-secondary">
      <section className="relative mx-auto w-full p-1 pt-20 pb-40 max-w-screen-2xl min-h-screen justify-items-center">
        <AppFormAddCategory />
      </section>
    </section>
  );
}
