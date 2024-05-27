"use client";
import { getAccessCookie, getCurrentUser } from "@/app/libs/actions/actions";
import { logout, setAuth } from "@/redux/features/auth/authSlice";
import { open } from "@/redux/features/modal/loginSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const CurrentUser = () => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState();
  useEffect(() => {
    const a = async () => {
      const b = await getAccessCookie();
      if (!b) {
        // console.log("!b", !b);
        dispatch(logout());
        // console.log("not token");
        dispatch(open());
      } else {
        // console.log("!b", !b);
        const user = await getCurrentUser();
        // console.log(b);
        setUserName(user?.name);
        dispatch(setAuth());
      }
    };
    a();
  });

  return <div className="text-5xl">{userName}</div>;
};

export default CurrentUser;
