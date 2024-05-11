import ReservationSidebar from "@/app/components/properties/ReservationSidebar";
import Image from "next/image";

const PropertyDetailPagePage = () => {
  return (
    <main className="max-w-[1500px] mx-auto px-6 pb-6">
      <div className="mb-4 w-full h-[64vh] overflow-hidden rounded-xl relative">
        <Image
          className="object-cover w-full h-full"
          fill
          src="/beach_1.jpg"
          alt="Beach house"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="py-6 pr-6 col-span-3">
          <h1 className="mb-4 text-4xl">Property name</h1>
          <span className="mb-6 block text-xl text-gray-600">
            4 guests - 2 bedrooms 1 bathroom
          </span>
          <hr />
          <div className="py-6 flex items-center space-x-4">
            <Image
              className="rounded-full"
              src="/profile_pic_1.jpg"
              width={50}
              height={50}
              alt="landlord pic"
            />
            <p>
              <strong>John Doe</strong> is your host
            </p>
          </div>
          <hr />
          <p className="mt-6 text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
            nemo quasi cupiditate illum sapiente quam debitis molestias tempore
            nostrum odit.
          </p>
        </div>
        <ReservationSidebar />
      </div>
    </main>
  );
};

export default PropertyDetailPagePage;
