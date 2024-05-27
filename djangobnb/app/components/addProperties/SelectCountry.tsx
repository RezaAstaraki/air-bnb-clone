"use client";
import useCountries from "@/app/hooks/useCountries";
import React from "react";
import Select from "react-select";

export type SelectCountryByValue = {
  label: string;
  value: string;
};

interface selectCountryProps {
  value?: SelectCountryByValue;
  onChange: (value: SelectCountryByValue) => void;
  className?: string;
}

const SelectCountry: React.FC<selectCountryProps> = ({
  value,
  onChange,
  className,
}) => {
  const { getAll } = useCountries();
  return (
    <Select
      isClearable={true}
      placeholder="Anywhere"
      options={getAll()}
      value={value}
      onChange={(value) => onChange(value as SelectCountryByValue)}
      className={className}
    />
  );
};

export default SelectCountry;
