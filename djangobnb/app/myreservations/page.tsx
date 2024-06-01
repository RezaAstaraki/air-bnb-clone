import Image from "next/image";
import { getMyReservations } from "../libs/actions/actions";
import Link from "next/link";

const MyReservationsPage = async () => {
  const data = await getMyReservations();
  const { reservations } = data;
  console.log(reservations[0]);

  return (
    <main className="max-w-[1500px] mx-auto px-6 pb-6">
      <h1 className="my-6 text-2xl">My reservations</h1>
      {reservations.length === 0 ? (
        <p className="text-xl ml-8 text-gray-500">No reservations</p>
      ) : (
        reservations.map((item: any) => {
          return (
            <div key={item.id} className="space-y-4">
              <div className="p-5 grid grid-cols-1 md:grid-cols-4 hover:bg-gray-50 gap-4 shadow-md hover:shadow-lg border border-gray-300 rounded-xl mt-4">
                <div className="col-span-1">
                  <div className="overflow-hidden relative aspect-square rounded-xl">
                    <Image
                      fill
                      alt={item.property.title}
                      className="hover:scale-110 object-cover transition h-full w-full"
                      src={`http://127.0.0.1:8000${item.property.image}`}
                    />
                  </div>
                </div>

                <div className="col-span-1 md:col-span-3">
                  <h2 className="mb-4 text-xl">
                    <strong>{item.property.title}</strong>
                  </h2>
                  <p className="mb-2">
                    <strong>Check in date:</strong> {item.start_date}
                  </p>
                  <p className="mb-2">
                    <strong>Check out date:</strong> {item.end_date}
                  </p>
                  <p className="mb-2">
                    <strong>Number of guests:</strong> {item.number_of_guests}
                  </p>
                  <p className="mb-2">
                    <strong>Number of nights:</strong> {item.number_of_nights}
                  </p>
                  <p className="mb-6">
                    <strong>Total price:</strong> ${item.total_price}
                  </p>

                  <Link
                    href={`/properties/${item.property.id}`}
                    className="inline-block cursor-pointer py-4 px-6 bg-airbnb hover:bg-airbnb-dark text-white rounded-xl"
                  >
                    Go to property
                  </Link>
                </div>
              </div>
            </div>
          );
        })
      )}
    </main>
  );
};

export default MyReservationsPage;
