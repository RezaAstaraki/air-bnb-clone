"use client";
import React from "react";
import { openSearch } from "@/redux/features/modal/searchSlice";
import { useDispatch } from "react-redux";

const SearchFilters = () => {
  const dispatch = useDispatch();

  return (
    <div className="h-[48px] lg:h-[64px] flex justify-between border rounded-full items-center flex-row lg:flex-1">
      <div className="hidden lg:flex lg:flex-1 ">
        <div className="flex   flex-1 flex-row justify-around items-center">
          <div className="cursor-pointer h-[48px] lg:h-[64px] justify-center flex flex-col px-2">
            <p className="text-xs font-semibold">where</p>
            <p className="text-xs">wanted location</p>
          </div>
          <div className="cursor-pointer h-[48px] lg:h-[64px] justify-center flex flex-col px-2">
            <p className="text-xs font-semibold">Check in</p>
            <p className="text-xs">Add dates</p>
          </div>
          <div className="cursor-pointer h-[48px] lg:h-[64px] justify-center flex flex-col px-2">
            <p className="text-xs font-semibold">Check out</p>
            <p className="text-xs">Add dates</p>
          </div>
          <div className="cursor-pointer h-[48px] lg:h-[64px] justify-center flex flex-col px-2">
            <p className="text-xs font-semibold">Who</p>
            <p className="text-xs">Add guests</p>
          </div>
        </div>
      </div>
      <div className="p-2">
        <div
          onClick={() => {
            dispatch(openSearch());
          }}
          className="cursor-pointer p-2 lg:p-4 bg-airbnb hover:bg-airbnb-dark transition rounded-full text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            style={{
              display: "block",
              fill: "none",
              height: "16px",
              width: "16px",
              stroke: "currentColor",
              strokeWidth: 4,
              overflow: "visible",
            }}
            aria-hidden="true"
            role="presentation"
            focusable="false"
          >
            <path
              fill="none"
              d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
