"use client";
// app/protectedPage/error.tsx

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { open as openLogin } from "@/redux/features/modal/loginSlice";

export default function CustomError() {
  //     {
  //   error,
  //   reset,
  // }: {
  //   error: Error;
  //   reset: any;
  //         }
  const dispatch = useDispatch();

  //   useEffect(() => {
  //     // Open the login modal if there is an error
  //     if (error.message === "no refresh token") {
  //       dispatch(openLogin());
  //     }
  //   }, [error, dispatch]);

  useEffect(() => {
    console.log("error");
  });

  return (
    <div>
      <h2>Something went wrong!</h2>
      {/* <button onClick={reset}>Try again</button> */}
    </div>
  );
}
