import { cookies } from "next/headers";
import Categories from "./components/navbar/Categories";
import PropertyList from "./components/properties/PropertyList";
import { revalidatePath } from "next/cache";

export default async function Home({ searchParams }: { searchParams: string }) {
  const access = cookies().get("session_access_token");
  const cookie = `${access?.name}=${access?.value}`;
  const query = new URLSearchParams(searchParams).toString();

  const res = await fetch(`http://127.0.0.1:8000/api/properties/?${query}`, {
    credentials: "include",

    headers: {
      "Content-Type": "application/json",
      Cookie: cookie,
    },
    cache: "no-store",
  });
  const data = await res.json();

  return (
    <main className="max-w-[1500px] mx-auto px-6">
      <Categories />
      <div className="mt-4 grid grid-col-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {data && <PropertyList list={data} />}
      </div>
    </main>
  );
}
