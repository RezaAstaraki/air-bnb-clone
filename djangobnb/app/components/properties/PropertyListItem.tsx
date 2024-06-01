import Image from "next/image";
import React from "react";
import FavoriteButton from "../FavoriteButton";

interface PropertyListItemProps {
  id: string;
  title: string;
  price_per_night: string;
  image_url: string;
}

const PropertyListItem: React.FC<PropertyListItemProps> = ({
  id,
  title,
  price_per_night,
  image_url,
}: PropertyListItemProps) => {
  return (
    <div className="cursor-pointer">
      <div className="relative overflow-hidden aspect-square rounded-xl">
        <Image
          src={image_url}
          alt={title}
          fill
          className="hover:scale-110 object-cover  transition-transform duration-300 h-full w-full"
          sizes="(max-width: 768px) 768px,(max-width: 1200px) 768px,768px,"
        />
        <FavoriteButton />
      </div>
      <div className="mt-2">
        <p className="text-lg font-bold">{title}</p>
      </div>
      <div className="mt-2">
        <p className="text-sm text-gray-500">
          <strong>{price_per_night}$</strong> per night
        </p>
      </div>
    </div>
  );
};

export default PropertyListItem;
