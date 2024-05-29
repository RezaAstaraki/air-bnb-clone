"use client";

import React, { ChangeEvent, useState } from "react";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { closeAddProperty } from "@/redux/features/modal/addPropertySlice";

import { RootState } from "@/redux/store";
import CustomButton from "../forms/CustomButton";
import { categories } from "../navbar/Categories";
import Image from "next/image";
import CategoryIcon from "../addProperties/CategoryIcon";
import SelectCountry, {
  SelectCountryByValue,
} from "../addProperties/SelectCountry";
import { submitPropertyData } from "@/app/libs/actions/actions";

const AddPropertyModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.addProperty.isOpen);

  const [current, setCurrent] = useState(1);
  const [category, setCategory] = useState<string | null>();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>();
  const [price, setPrice] = useState(0);
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [guests, setGuests] = useState(0);
  const [country, setCountry] = useState<SelectCountryByValue>();
  const [image, setDataImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const setImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const tmpImage = event.target.files[0];
      setDataImage(tmpImage);
    }
  };

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
            <label
              htmlFor="country"
              className="self-start text-sm text-gray-700"
            >
              Country
            </label>

            <SelectCountry
              onChange={setCountry}
              value={country}
              className="w-full"
            />
          </>
        )}

        {current == 5 && (
          <>
            <h1 className="pb-5">image</h1>

            <input
              type="file"
              accept="image/*"
              onChange={setImage}
              name="image"
              className="bg-gray-700 py-4 w-full rounded-xl pl-5"
            />
            {image && (
              <div className="w-[200px] h-[150px] relative">
                <Image
                  src={URL.createObjectURL(image)}
                  alt="uploaded image"
                  fill
                  className="object-cover w-full h-full rounded-xl"
                />
              </div>
            )}
          </>
        )}
      </div>

      <div className="flex flex-row justify-around pt-4">
        <CustomButton
          // isLoading={isLoading}
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
          isLoading={isLoading}
          type="button"
          onClick={async () => {
            if (current < 5) {
              setCurrent((prev) => prev + 1);
            } else if (current === 5) {
              // setIsLoading(true);
              if (
                category &&
                title &&
                description &&
                price &&
                country &&
                image
              ) {
                const formData = new FormData();
                formData.append("category", category);
                formData.append("title", title);
                formData.append("descriptions", description);
                formData.append("price_per_night", String(price));
                formData.append("bedrooms", String(bedrooms));
                formData.append("bathrooms", String(bathrooms));
                formData.append("guests", String(guests));
                formData.append("country", country.label);
                formData.append("country_code", country.value);
                formData.append("image", image);
                const res = await submitPropertyData(formData);
                console.log(res);
              }
              {
              }
              // setIsLoading(false);
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
