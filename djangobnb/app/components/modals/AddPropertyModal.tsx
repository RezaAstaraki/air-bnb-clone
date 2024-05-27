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
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [price, setPrice] = useState(0);
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [guests, setGuests] = useState(0);

  const categories = [
    { src: "/beach.jpg", text: "Beach" },
    { src: "/villas.jpg", text: "Villas" },
    { src: "/cabins.jpg", text: "Cabins" },
    { src: "/tiny-houses.jpg", text: "Tiny Homes" },
  ];
  const content = (
    <>
      <div className="flex justify-center items-center flex-col gap-2">
        {current == 1 && (
          <>
            <h1 className="pb-5">select Category</h1>
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
                    className={
                      category === item.text
                        ? "bg-sky-200/60 opacity-100 shadow-2xl border-b-0"
                        : "opacity-50"
                    }
                  />
                );
              })}
            </div>
          </>
        )}
        {current == 2 && (
          <>
            <h1 className="pb-5">Describe your place</h1>
            <label htmlFor="title" className="self-start text-sm text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className="border-gray-300 border-2 py-2 px-2 rounded-xl self-start w-full"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              value={title}
            />
            <label
              htmlFor="description"
              className="self-start mt-5 text-sm text-gray-700"
            >
              Description
            </label>

            <textarea
              rows={5}
              name="description"
              id="description"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              value={description}
              className="border-gray-300 border-2 py-2 px-2 rounded-xl self-start w-full"
            />
          </>
        )}
        {current == 3 && (
          <>
            <h1 className="pb-5">Details</h1>

            <label htmlFor="price" className="self-start text-sm text-gray-700">
              Price
            </label>
            <input
              type="number"
              min={0}
              name="price"
              id="price"
              className="border-gray-300 border-2 py-2 px-2 rounded-xl self-start w-full"
              onChange={(e) => {
                setPrice(Number(e.target.value));
              }}
              value={price}
            />

            <label
              htmlFor="bedrooms"
              className="self-start mt-5 text-sm text-gray-700"
            >
              Bedrooms
            </label>
            <input
              type="number"
              min={0}
              name="bedrooms"
              id="bedrooms"
              onChange={(e) => {
                setBedrooms(Number(e.target.value));
              }}
              value={bedrooms}
              className="border-gray-300 border-2 py-2 px-2 rounded-xl self-start w-full"
            />

            <label
              htmlFor="bathrooms"
              className="self-start mt-5 text-sm text-gray-700"
            >
              Bathrooms
            </label>
            <input
              type="number"
              min={0}
              name="bathrooms"
              id="bathrooms"
              onChange={(e) => {
                setBathrooms(Number(e.target.value));
              }}
              value={bathrooms}
              className="border-gray-300 border-2 py-2 px-2 rounded-xl self-start w-full"
            />

            <label
              htmlFor="guests"
              className="self-start mt-5 text-sm text-gray-700"
            >
              Maximum number of guests
            </label>
            <input
              type="number"
              min={0}
              name="guests"
              id="guests"
              onChange={(e) => {
                setGuests(Number(e.target.value));
              }}
              value={guests}
              className="border-gray-300 border-2 py-2 px-2 rounded-xl self-start w-full"
            />
          </>
        )}

        {current == 4 && (
          <>
            <h1 className="pb-5">Location</h1>
            <label htmlFor="title" className="self-start text-sm text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className="border-gray-300 border-2 py-2 px-2 rounded-xl self-start w-full"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              value={title}
            />
          </>
        )}
      </div>

      <div className="flex flex-row justify-around pt-4">
        <CustomButton
          type="button"
          label="Previous"
          disabled={current === 1 ? true : false}
          onClick={() => {
            if (current > 1) {
              setCurrent((prev) => prev - 1);
            }
          }}
          className="w-[110px] h-[40px] flex justify-center items-center"
        />
        <CustomButton
          type="button"
          onClick={() => {
            if (current < 5) {
              setCurrent((prev) => prev + 1);
            }
          }}
          label={current === 5 ? "Submit" : "Next"}
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
