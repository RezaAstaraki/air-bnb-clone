"use client";
import React, { useState } from "react";
import { HeartIcon as Solid } from "@heroicons/react/24/solid";
import { HeartIcon as Outlined } from "@heroicons/react/24/outline";
import { toggleFavorite } from "../libs/actions/actions";
import { open } from "@/redux/features/modal/loginSlice";
import { useDispatch } from "react-redux";
import { revalidatePath } from "next/cache";

const FavoriteButton = ({
  isFavored = false,
  propertyId,
}: {
  isFavored?: boolean;
  propertyId: string;
}) => {
  const dispatch = useDispatch();
  const [_isFavored, setIsFavored] = useState(isFavored);

  const handleClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    const response = await toggleFavorite(propertyId);
    if (!response.code) {
      dispatch(open());
    } else {
      setIsFavored((prev) => !prev);
    }
  };

  return (
    <div onClick={handleClick} className="absolute top-2 right-4 text-red-600">
      {_isFavored ? (
        <Solid
          width={30}
          height={30}
          style={{ filter: "drop-shadow(0 0 2px rgb(100, 255, 255))" }}
        />
      ) : (
        <Outlined
          width={30}
          height={30}
          style={{
            filter: "drop-shadow(0 0 2px rgb(100, 255, 255))",
          }}
        />
      )}
    </div>
  );
};

export default FavoriteButton;
