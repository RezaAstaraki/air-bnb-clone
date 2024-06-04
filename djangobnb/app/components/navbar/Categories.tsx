"use client";

import Image from "next/image";
import Link from "next/link";
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
    // console.log("state = ", categoryState);

    // console.log("path =", path);
    // console.log("if =", searchParams.toString() == "");
    // console.log('searchParams.toString() == ""', searchParams.toString() == "");

    // console.log(searchParams.getAll("category"));
    // console.log("search params", searchParams.get("category"));
    let query = "";
    let prevQuery = searchParams.toString();
    if (prevQuery == "") {
      const newquery = categoryState.forEach((value) => {
        query += `category=${value}&`;
      });
    } else {
      categoryState.forEach((value) => {
        prevQuery = prevQuery.replaceAll(`category=${value}`, "");

        query += `category=${value}&`;
      });
      prevQuery = prevQuery.replaceAll("&&", "&");
    }
    query = prevQuery + query;
    console.log("prevQuery", prevQuery);
    console.log("Query", query);

    // console.log(query);
    // router.push(`/?${query}`);

    // console.log("search", searchParams.toString());
  }, [categoryState, searchParams]);

  const toggleCategories = (category: string) => {
    setCategoryState((prev) => {
      if (!prev.includes(category)) {
        const newCategory = [...prev, category];
        return newCategory;
      } else {
        const newCategory = prev.filter((item) => {
          return item !== category;
        });
        return newCategory;
      }
    });
  };

  return (
    <div className="flex flex-row items-center">
      {categories.map((item, index) => (
        <div
          key={index}
          className={` hover:opacity-100 cursor-pointer p-4 border-b-4 border-white hover:border-gray-200 flex flex-col justify-center items-center ${
            categoryState.includes(item.text)
              ? "bg-blue-300 opacity-100 shadow-md border-yellow-300 "
              : "opacity-60"
          }`}
          onClick={() => {
            toggleCategories(item.text);
          }}
        >
          <Image width={30} height={30} alt="" src={item.src} />
          <span className="pt-2">{item.text}</span>
        </div>
      ))}
    </div>
  );
};

export default Categories;
