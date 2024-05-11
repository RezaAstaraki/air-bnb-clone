"use client";

interface MenuLinkProps {
  label: string;
  className?: string;
  onClick: () => void;
}

import React from "react";

const MenuLink: React.FC<MenuLinkProps> = ({ label, className, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer px-5 py-4 hover:bg-gray-100  transition${className}`}
    >
      {label}
    </div>
  );
};

export default MenuLink;
