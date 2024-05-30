import Categories from "./components/navbar/Categories";
import PropertyList from "./components/properties/PropertyList";

export default async function Home() {
  const res = await fetch("http://127.0.0.1:8000/api/properties/", {
    cache: "no-store",
  });
  const data = await res.json();
  // console.log(data);
  return (
    <main className="max-w-[1500px] mx-auto px-6">
      <Categories />
      <div className="mt-4 grid grid-col-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {data && <PropertyList list={data} />}
      </div>
    </main>
  );
}
