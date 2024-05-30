"use client";

import { useEffect } from "react";
import { Calendar, DateRange, Range, RangeKeyDict } from "react-date-range";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

interface DatePickerProps {
  value: Range;
  onChange: (value: RangeKeyDict) => void;
  bookedDates?: Date[];
}

const DatePicker: React.FC<DatePickerProps> = ({
  onChange,
  value,
  bookedDates,
}: DatePickerProps) => {
  return (
    <DateRange
      className="w-full border border-gray-400 rounded-xl mb-4"
      rangeColors={["#262626"]}
      ranges={[value]}
      date={new Date()}
      onChange={onChange}
      direction="vertical"
      showDateDisplay={false}
      minDate={new Date()}
      disabledDates={bookedDates}
    />
  );
};

export default DatePicker;
