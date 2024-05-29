"use client";

import { getCurrentUser } from "@/app/libs/actions/actions";
import { getAccessCookie } from "@/app/libs/actions/handelJWT";
import { logout, setAuth } from "@/redux/features/auth/authSlice";
import { open } from "@/redux/features/modal/loginSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const CurrentUser = () => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState();
  useEffect(() => {
    const a = async () => {
      const access = await getAccessCookie();
      console.log("access =  ", access);
      if (!access) {
        console.log("!access", !access);
        dispatch(logout());
        console.log("not token");
        // dispatch(open());
      } else {
        console.log("!access", !access);
        const user = await getCurrentUser();
        console.log("access ", access);
        setUserName(user?.id);
        dispatch(setAuth());
      }
    };
    a();
  });

  return <div className="text-sm">{userName}</div>;
};

export default CurrentUser;
