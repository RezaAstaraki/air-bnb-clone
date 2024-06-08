import { cookies } from "next/headers";
import Categories from "./components/navbar/Categories";
import PropertyList from "./components/properties/PropertyList";
import { getProperties } from "./libs/actions/actions";

export default async function Home({ searchParams }: { searchParams: string }) {
  const query = new URLSearchParams(searchParams).toString();

  const data = await getProperties(query);

  return (
    <main className="max-w-[1500px] mx-auto px-6">
      <Categories />
      <div className="mt-4 grid grid-col-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {data && <PropertyList list={data} />}
      </div>
    </main>
  );
}
