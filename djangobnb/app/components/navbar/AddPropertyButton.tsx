"use client";

import { openAddProperty } from "@/redux/features/modal/addPropertySlice";
import { open } from "@/redux/features/modal/loginSlice";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";

const AddPropertyButton = () => {
  openAddProperty();
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const dispatch = useDispatch();
  return (
    <div
      className="cursor-pointer p-2 text-sm font-semibold rounded-full hover:bg-gray-100 select-none border min-w-fit "
      onClick={() => {
        if (isAuth) {
          dispatch(openAddProperty());
        } else {
          dispatch(open());
        }
      }}
    >
      Add Your Home
    </div>
  );
};

export default AddPropertyButton;
