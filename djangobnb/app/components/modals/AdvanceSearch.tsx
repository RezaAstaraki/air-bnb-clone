"use client";

import React, { FormEvent, useEffect, useState } from "react";
import Modal from "./Modal";
import CustomButton from "../forms/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { closeSearch } from "@/redux/features/modal/searchSlice";
import { useRouter } from "next/navigation";
import { serverLogin } from "@/app/libs/actions/actions";
import { finishFirstLoad, setAuth } from "@/redux/features/auth/authSlice";
import { openSearch } from "@/redux/features/modal/searchSlice";
import SelectCountry, {
  SelectCountryByValue,
} from "../addProperties/SelectCountry";
import Image from "next/image";
import CategoryIcon from "../addProperties/CategoryIcon";
import DatePicker from "../forms/Calender";
import { Range, RangeKeyDict } from "react-date-range";
import { format } from "date-fns";

const AdvanceSearch = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.search.isOpen);

  const router = useRouter();

  const [current, setCurrent] = useState(1);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [guests, setGuests] = useState(1);
  const [country, setCountry] = useState<SelectCountryByValue>();
  const [isLoading, setIsLoading] = useState(false);

  const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  };
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const _setDateRange = (selection: Range) => {
    selection.startDate;
    setDateRange((p) => {
      return {
        ...p,
        startDate: selection.startDate,
        endDate: selection.endDate,
      };
    });
  };

  const setQueries = () => {
    const query = new URLSearchParams();
    if (Number(minPrice) > 0) {
      query.append("minPrice", String(minPrice));
    }
    if (Number(maxPrice) > 0) {
      query.append("maxPrice", String(maxPrice));
    }
    if (dateRange.startDate) {
      query.append("startDate", format(dateRange.startDate, "yyyy-MM-dd"));
    }
    if (dateRange.endDate) {
      query.append("endDate", format(dateRange.endDate, "yyyy-MM-dd"));
    }
    if (Number(bedrooms) > 0) {
      query.append("bedrooms", String(bedrooms));
    }
    if (Number(guests) > 0) {
      query.append("guests", String(guests));
    }
    if (Number(bathrooms) > 0) {
      query.append("bathrooms", String(bathrooms));
    }
    return query.toString();
  };

  const content = (
    <>
      <div className="flex justify-center items-center flex-col gap-2">
        {current == 1 && (
          <>
            <h1 className="pb-5">Where do you want to go?</h1>
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

        {current == 2 && (
          <>
            <h1 className="pb-5">Check in</h1>
            <DatePicker
              onChange={(k) => _setDateRange(k.selection)}
              value={dateRange}
            />
          </>
        )}

        {current == 3 && (
          <>
            <h1 className="pb-5">Details</h1>

            <label htmlFor="price" className="self-start text-sm text-gray-700">
              Price Range
            </label>
            <div className="flex w-full gap-4">
              <input
                type="number"
                min={0}
                name="minPrice"
                id="price"
                className="border-gray-300 border-2 py-2 px-2 rounded-xl self-start w-full"
                onChange={(e) => {
                  setMinPrice(Number(e.target.value));
                }}
                value={minPrice}
              />
              <input
                type="number"
                min={0}
                name="maxPrice"
                id="price"
                className="border-gray-300 border-2 py-2 px-2 rounded-xl self-start w-full"
                onChange={(e) => {
                  setMaxPrice(Number(e.target.value));
                }}
                value={maxPrice}
              />
            </div>

            <label
              htmlFor="bedrooms"
              className="self-start mt-5 text-sm text-gray-700"
            >
              Minimum number of bedrooms
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
              Minimum number of bathrooms
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
              Minimum number of guests
            </label>
            <input
              type="number"
              min={1}
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
            if (current < 3) {
              setCurrent((prev) => prev + 1);
            } else if (current === 3) {
              // setIsLoading(true);
              // if (
              //   maxPrice &&
              //   country &&
              //   bedrooms &&
              //   guests &&
              //   maxPrice >= minPrice
              // ) {
              const query = setQueries();
              console.log(query);
              router.push(`/?${query}`);
              dispatch(closeSearch());
              // }
              // setIsLoading(false);
            }
          }}
          label={current === 3 ? "Search" : "Next"}
          className="w-[110px] h-[40px] flex justify-center items-center"
        />
      </div>
    </>
  );

  return (
    <Modal
      close={() => dispatch(closeSearch())}
      isOpen={isOpen}
      label="Advance Search"
      content={content}
    />
  );
};

export default AdvanceSearch;
