"use client";

import Categories from "./components/navbar/Categories";
import PropertyList from "./components/properties/PropertyList";

import { useGetPropertiesListQuery } from "@/redux/features/servicess/property/propertyApi";

export default function Home() {
  const { data, error, isLoading } = useGetPropertiesListQuery(undefined);

  return (
    <main className="max-w-[1500px] mx-auto px-6">
      {/* <>{JSON.stringify(data)}</> */}

      <Categories />
      <div className="mt-4 grid grid-col-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {data && <PropertyList list={data} />}
      </div>
    </main>
  );
}
