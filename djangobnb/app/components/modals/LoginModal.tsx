"use client";

import React, { FormEvent, useState } from "react";
import Modal from "./Modal";
import CustomButton from "../forms/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { close } from "@/redux/features/modal/loginSlice";
import { useLoginMutation } from "@/redux/features/servicess/auth/authAPI";
import { useRouter } from "next/navigation";
import { handelLogin } from "@/app/libs/actions/handelLogin";

const LoginModal = () => {
  const [error, setError] = useState([]);
  const router = useRouter();

  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    login({ email: email, password: password })
      .unwrap()
      .then((response) => {
        console.log("first");
        console.log(JSON.stringify(response));
        dispatch(close());
        handelLogin(response.access, response.refresh);
        router.push("/");
      })
      .catch((e) => {
        setError(Object.values(e.data));
        // setTimeout(() => {
        //   setError([]);
        // }, 5000);
        console.log("error = ", Object.values(e));
      });
  };

  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.loginModal.isOpen);

  const Content = (
    <>
      <h2 className="mb-6 text-2xl">Welcome to Djangobnb, please log in</h2>
      <form className="space-y-4" onSubmit={onSubmit}>
        <input
          type="email"
          name="email"
          id=""
          placeholder="Your e-mail address"
          className="w-full h-[54px] border border-gray-100 rounded-xl px-4 "
        />
        <input
          type="password"
          name="password"
          id=""
          placeholder="Your password"
          className="w-full h-[54px] border border-gray-100 rounded-xl px-4 "
        />
        {error.length > 0 && (
          <div className="p-5 bg-airbnb text-white rounded-xl opacity-80">
            {error}
          </div>
        )}

        <CustomButton
          isLoading={isLoading}
          label={isLoading ? "loading..." : "Submit"}
        />
      </form>
    </>
  );

  return (
    <Modal
      close={() => dispatch(close())}
      isOpen={isOpen}
      label="Log in"
      content={Content}
    />
  );
};

export default LoginModal;
