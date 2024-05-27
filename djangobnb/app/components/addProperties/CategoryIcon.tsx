import Image from "next/image";
import React from "react";

interface IconProps {
  src: string;
  alt: string;
  text: string;
  onClick?: () => void;
  className?: string;
}

const CategoryIcon = ({ src, alt, text, onClick, className }: IconProps) => {
  return (
    <div
      onClick={onClick}
      className={` hover:opacity-100 cursor-pointer p-4 border-b-4 border-white hover:border-gray-200 flex flex-col justify-center items-center ${className}`}
    >
      <Image width={30} height={30} alt={alt} src={src} />
      <span className="pt-2">{text}</span>
    </div>
  );
};

export default CategoryIcon;
