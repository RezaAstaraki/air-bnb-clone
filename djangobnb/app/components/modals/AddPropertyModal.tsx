"use client";

import React from "react";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { closeAddProperty } from "@/redux/features/modal/addPropertySlice";

import { RootState } from "@/redux/store";

const AddPropertyModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.addProperty.isOpen);

  const content = <>Yo</>;

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
