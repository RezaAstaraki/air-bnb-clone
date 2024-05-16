"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import SearchFilters from "./SearchFilters";
import UserNav from "./UserNav";
import AddPropertyButton from "./AddPropertyButton";
import { useGetCurrentUserQuery } from "@/redux/features/servicess/auth/authAPI";
import { getAccessCookie } from "@/app/libs/actions/actions";

const Navbar = () => {
  const [access, setAccess] = useState("");

  useEffect(() => {
    const fetchAccess = async () => {
      try {
        const token = await getAccessCookie();
        if (token) {
          setAccess(token?.value);
        }
      } catch (error) {
        console.error("Error fetching access token:", error);
      }
    };

    fetchAccess();
  }, []);

  // Use the access token to query current user data
  const { data, error, isLoading } = useGetCurrentUserQuery(access);

  useEffect(() => {
    if (data) {
      console.log("Current user data:", data);
    }
    if (error) {
      console.error("Error fetching current user data:", error);
    }
  }, [data, error]);

  return (
    <nav className="w-full fixed top-0 left-0 py-6 border-b bg-white z-10">
      <div className="max-w-[1500px] mx-auto px-6">
        <div className="flex justify-between items-center">
          <Link href="/">
            <Image
              alt="DjangoBnb logo"
              width={180}
              height={38}
              src="/logo.png"
            />
          </Link>
          <div className="flex space-x-6">
            <SearchFilters />
          </div>
          <div className="flex items-center space-x-6">
            <AddPropertyButton />
            <UserNav />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
