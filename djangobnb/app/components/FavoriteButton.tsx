"use client";
import React, { useState } from "react";
import { HeartIcon as Solid } from "@heroicons/react/24/solid";
import { HeartIcon as Outlined } from "@heroicons/react/24/outline";

const FavoriteButton = ({
  isFavored = false,
  onClick,
}: {
  isFavored?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}) => {
  const [_isFavored, setIsFavored] = useState(isFavored);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setIsFavored((prev) => !prev);
    console.log("clicked");
    if (onClick) {
      onClick(e);
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
