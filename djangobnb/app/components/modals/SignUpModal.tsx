"use client";

import React, { FormEvent, useState } from "react";
import Modal from "./Modal";
import CustomButton from "../forms/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { close } from "@/redux/features/modal/signupSlice";
import { createUser } from "@/app/libs/actions/actions";
import { useRouter } from "next/navigation";
import { open } from "@/redux/features/modal/loginSlice";

const SingUpModal = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.signup.isOpen);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    dispatch(close());
    router.push("/");
  };

  //content of form
  const content = (
    <>
      <h2 className="mb-6 text-2xl">Welcome to Djangobnb, please Sign up</h2>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setLoading(true);
          const formData = new FormData(e.currentTarget);
          const res = await createUser(formData);
          console.log("res", res);
          if (res?.resOK) {
            onSubmit(e);
          } else {
            setError(res?.message);
          }
          setLoading(false);
        }}
        className="space-y-4"
      >
        <input
          type="name"
          name="name"
          placeholder="Your name"
          className="w-full h-[54px] border border-gray-100 rounded-xl px-4 "
        />
        <input
          type="email"
          name="email"
          placeholder="Your e-mail address"
          className="w-full h-[54px] border border-gray-100 rounded-xl px-4 "
        />
        <input
          type="password"
          name="password"
          placeholder="Your password"
          className="w-full h-[54px] border border-gray-100 rounded-xl px-4 "
        />
        <input
          type="password"
          name="re_password"
          placeholder="Repeat password"
          className="w-full h-[54px] border border-gray-100 rounded-xl px-4 "
        />

        {error && (
          <div className="p-5 bg-airbnb text-white rounded-xl opacity-80">
            <ul>
              {Object.entries(error).map(([key, value]) => {
                return (
                  <li key={key}>
                    {key} --&gt; {String(value)}
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        <CustomButton isLoading={loading} label="Sign up" />

        <div
          className="text-xs text-blue-500 cursor-pointer "
          onClick={() => {
            dispatch(close());
            dispatch(open());
          }}
        >
          i already have account
        </div>
      </form>
    </>
  );

  return (
    <Modal
      close={() => dispatch(close())}
      isOpen={isOpen}
      label="Sign up"
      content={content}
    />
  );
};
export default SingUpModal;
