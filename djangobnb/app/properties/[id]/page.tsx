import DatePicker from "@/app/components/forms/Calender";
import ReservationSidebar from "@/app/components/properties/ReservationSidebar";
import { getPropertyDetail } from "@/app/libs/actions/actions";
import Image from "next/image";
import Link from "next/link";

const PropertyDetailPagePage = async ({
  params,
}: {
  params: { id: string };
}) => {
  const data = await getPropertyDetail(params.id);

  return (
    <main className="max-w-[1500px] mx-auto px-6 pb-6">
      <div className="mb-4 w-full h-[64vh] overflow-hidden rounded-xl relative">
        <Image
          className="object-cover w-full h-full"
          fill
          src={data.image}
          alt="Beach house"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="py-6 pr-6 col-span-3">
          <h1 className="mb-4 text-4xl">{data.title}</h1>
          <span className="mb-6 block text-xl text-gray-600">
            {data.guests} guests - {data.bedrooms} bedrooms {data.bathrooms}{" "}
            bathroom
          </span>
          <hr />
          <Link
            href={`/landlords/${data.landlord.id}`}
            className="py-6 flex items-center space-x-4"
          >
            {data.landlord.avatar && (
              <Image
                className="rounded-full"
                src={data.landlord.avatar}
                width={50}
                height={50}
                alt="landlord pic"
              />
            )}

            <p>
              <strong>{data.landlord.name}</strong> is your host
            </p>
          </Link>
          <hr />
          <p className="mt-6 text-lg">{data.descriptions}</p>
        </div>
        <ReservationSidebar
          max_guests={data.guests}
          price_per_night={data.price_per_night}
          propertyId={params.id}
        />
      </div>
    </main>
  );
};

export default PropertyDetailPagePage;
