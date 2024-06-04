"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export const categories = [
  { src: "/beach.jpg", text: "Beach" },
  { src: "/villas.jpg", text: "Villas" },
  { src: "/cabins.jpg", text: "Cabins" },
  { src: "/tiny-houses.jpg", text: "Tiny Homes" },
];

const Categories = () => {
  const path = usePathname();
  const searchParams = useSearchParams();
  const [categoryState, setCategoryState] = useState<string[]>(
    searchParams.getAll("category")
  );

  const router = useRouter();

  useEffect(() => {
    // Create a new URLSearchParams object from the current search parameters
    const params = new URLSearchParams(searchParams.toString());

    // Clear all current 'category' parameters
    params.delete("category");

    // Add the categories from the state to the params
    categoryState.forEach((category) => {
      params.append("category", category);
    });

    const queryString = params.toString();

    // Update the router with the new query string
    router.push(`/?${queryString}`);
  }, [categoryState]);

  const toggleCategories = (category: string) => {
    setCategoryState((prev) => {
      if (!prev.includes(category)) {
        return [...prev, category];
      } else {
        return prev.filter((item) => item !== category);
      }
    });
  };

  return (
    <div className="flex flex-row items-center">
      {categories.map((item, index) => (
        <div
          key={index}
          className={`hover:opacity-100 cursor-pointer p-4 border-b-4 border-white hover:border-gray-200 flex flex-col justify-center items-center ${
            categoryState.includes(item.text)
              ? "bg-blue-300 opacity-100 shadow-md border-yellow-300 "
              : "opacity-60"
          }`}
          onClick={() => toggleCategories(item.text)}
        >
          <Image width={30} height={30} alt="" src={item.src} />
          <span className="pt-2">{item.text}</span>
        </div>
      ))}
    </div>
  );
};

export default Categories;
