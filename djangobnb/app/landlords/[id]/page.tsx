import ContactButton from "@/app/components/ContactButton";
import PropertyList from "@/app/components/properties/PropertyList";
import { getCurrentUser, getLandlordDetails } from "@/app/libs/actions/actions";
import Image from "next/image";

export default async function LandlordDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await getLandlordDetails(params.id);
  const current_user = await getCurrentUser();

  return (
    <main className="max-w-[1500px] mx-auto px-6 pb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {current_user.id !== params.id && (
          <aside className="col-span-1 mb-4">
            <div className="flex flex-col items-center p-6 rounded-xl border border-gray-300 shadow-xl relative">
              {data.avatar && (
                <Image
                  alt="land lord pic"
                  src={`http://127.0.0.1:8000${data.avatar}`}
                  width={200}
                  height={200}
                  className="rounded-full"
                />
              )}
              <h1 className="mt-6 text-2xl">{data.name}</h1>
              <ContactButton />
            </div>
          </aside>
        )}
        <div className="col-span-1 md:col-span-3 pl-0 md:pl-6">
          <div className="grid grid-col-1 md:grid-cols-3 gap-6">
            <PropertyList list={data.properties} />
          </div>
        </div>
      </div>
    </main>
  );
}
