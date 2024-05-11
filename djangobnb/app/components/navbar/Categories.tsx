import Image from "next/image";
import React from "react";

const categories = [
  { src: "/beach.jpg", text: "Beach" },
  { src: "/villas.jpg", text: "Villas" },
  { src: "/cabins.jpg", text: "Cabins" },
  { src: "/tiny-houses.jpg", text: "Tiny Homes" },
];
const Categories = () => {
  return (
    <div className="flex flex-row items-center">
      {categories.map((item, index) => (
        <div
          key={index}
          className="opacity-60 hover:opacity-100 cursor-pointer p-4 border-b-4 border-white hover:border-gray-200 flex flex-col justify-center items-center"
        >
          <Image width={30} height={30} alt="" src={item.src} />
          <span className="pt-2">{item.text}</span>
        </div>
      ))}
    </div>
  );
};

export default Categories;
