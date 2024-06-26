"use client";

import CustomButton from "@/app/components/forms/CustomButton";
import { activateUser } from "@/app/libs/actions/actions";
import { useDispatch } from "react-redux";
import { open } from "@/redux/features/modal/loginSlice";
import { useState } from "react";

const ActivationPage = ({
  params,
}: {
  params: { uid: string; token: string };
}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="text-xl text-gray-500 font-bold">
        Activate Your Account
      </div>
      <form
        onSubmit={async (e) => {
          setLoading(true);
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const res = await activateUser(formData);
          // console.log(res);
          if (res.resOK) {
            dispatch(open());
          } else {
            Object.entries(res.message).map((key) => {
              console.log(String(key[1]));
            });
          }
          setLoading(false);
        }}
        className="flex text-center justify-center items-center h-[200px] w-[200px]"
      >
        <CustomButton
          isLoading={loading}
          label="activate you account"
          className="px-3"
        />
        <input name="token" type="hidden" value={params.token} />
        <input name="uid" type="hidden" value={params.uid} />
      </form>
    </div>
  );
};

export default ActivationPage;
