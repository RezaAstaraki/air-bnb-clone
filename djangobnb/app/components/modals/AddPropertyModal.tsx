"use client";

import React, { useState } from "react";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { closeAddProperty } from "@/redux/features/modal/addPropertySlice";

import { RootState } from "@/redux/store";
import CustomButton from "../forms/CustomButton";
import Categories from "../navbar/Categories";
import Image from "next/image";
import CategoryIcon from "../addProperties/CategoryIcon";

const AddPropertyModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.addProperty.isOpen);

  const [current, setCurrent] = useState(1);
  const [category, setCategory] = useState<string | null>();

  const categories = [
    { src: "/beach.jpg", text: "Beach" },
    { src: "/villas.jpg", text: "Villas" },
    { src: "/cabins.jpg", text: "Cabins" },
    { src: "/tiny-houses.jpg", text: "Tiny Homes" },
  ];
  const content = (
    <>
      {current == 1 && (
        <div className="flex justify-center items-center flex-col gap-5">
          <h1>select Category</h1>
          <div className="flex flex-row pb-5">
            {categories.map((item, index) => {
              return (
                <CategoryIcon
                  onClick={() => {
                    setCategory(item.text);
                  }}
                  key={index}
                  alt={item.text}
                  text={item.text}
                  src={item.src}
                />
              );
            })}
          </div>
        </div>
      )}
      {current == 2 && <h1>title 2</h1>}
      {current == 3 && <h1>title 3</h1>}

      <div className="flex flex-row justify-around pt-4">
        <CustomButton
          label="previous"
          onClick={() => {
            if (current > 1) {
              setCurrent((prev) => prev - 1);
            }
          }}
          className="w-[110px] h-[40px] flex justify-center items-center"
        />
        <CustomButton
          onClick={() => {
            if (current < 3) {
              setCurrent((prev) => prev + 1);
            }
          }}
          label="next"
          className="w-[110px] h-[40px] flex justify-center items-center"
        />
      </div>
    </>
  );

  return (
    <>
      <Modal
        close={() => dispatch(closeAddProperty())}
        content={content}
        isOpen={isOpen}
        label="AddProperty"
      />
    </>
  );
};

export default AddPropertyModal;
