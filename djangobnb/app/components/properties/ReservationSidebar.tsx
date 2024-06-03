"use client";

import { differenceInDays, format, eachDayOfInterval } from "date-fns";
import { useEffect, useState } from "react";
import { DateRange, Range, RangeKeyDict } from "react-date-range";
import DatePicker from "../forms/Calender";
import { getAccessCookie } from "@/app/libs/actions/handelJWT";
import {
  getPropertyReservationList,
  postBooking,
} from "@/app/libs/actions/actions";

const initialDateRange: Range = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

const ReservationSidebar = ({
  price_per_night,
  max_guests,
  propertyId,
}: {
  price_per_night: number;
  max_guests: number;
  propertyId: string;
}) => {
  const [fee, setFee] = useState<number>(0);
  const [nights, setNights] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [dateRange, setdateRange] = useState<Range>(initialDateRange);
  const [minDate, setMinDate] = useState<Date>(new Date());
  const [guests, setGuests] = useState<number>(1);
  const [bookedDates, setBookedDates] = useState<Date[]>([]);

  const guestsRange = Array.from(
    { length: max_guests },
    (_, index) => index + 1
  );

  const _setDateRange = (selection: any) => {
    const newStartDate = new Date(selection.startDate);
    const newEndDate = new Date(selection.endDate);

    if (newEndDate <= newStartDate) {
      newEndDate.setDate(newStartDate.getDate() + 1);
    }

    setdateRange({
      ...dateRange,
      startDate: newStartDate,
      endDate: newEndDate,
    });
  };

  const performBooking = async (propertyId: string) => {
    if (dateRange.startDate && dateRange.endDate) {
      const formData = new FormData();
      formData.append("start_date", format(dateRange.startDate, "yyyy-MM-dd"));
      formData.append("end_date", format(dateRange.endDate, "yyyy-MM-dd"));
      formData.append("number_of_guests", String(guests));
      formData.append("number_of_nights", String(nights));
      formData.append("total_price", String(totalPrice));
      const res = await postBooking(formData, propertyId);
    }
  };

  const getReservations = async () => {
    const res = await getPropertyReservationList(propertyId);
    const allDates = res.flatMap((item: any) =>
      eachDayOfInterval({
        start: new Date(item.start_date),
        end: new Date(item.end_date),
      })
    );
    setBookedDates(allDates);
  };

  useEffect(() => {
    const as = async () => {
      await getReservations();
    };
    as();

    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate);
      if (dayCount && price_per_night) {
        const _fee = ((dayCount * price_per_night) / 100) * 5;
        setFee(_fee);
        setTotalPrice(dayCount * price_per_night + _fee);
        setNights(dayCount);
      } else {
        const _fee = (price_per_night / 100) * 5;
        setFee(_fee);
        setTotalPrice(price_per_night + _fee);
        setNights(1);
      }
    }
  }, [dateRange]);

  return (
    <aside className="mt-6 p-6 col-span-2 rounded-xl border border-gray-300 shadow-lg min-w-[380px]">
      <h2 className="mb-5 text-2xl ">${price_per_night} per night</h2>
      <DatePicker
        value={dateRange}
        onChange={(value) => _setDateRange(value.selection)}
        bookedDates={bookedDates}
      />
      <div className="mb-6 p-3 border border-gary-400 rounded-xl">
        <label className="mb-2 block font-bold text-xs ">Guests</label>
        <select
          className="bg-white w-full -ml-1 text-sm"
          onChange={(e) => setGuests(Number(e.target.value))}
        >
          {guestsRange.map((item) => (
            <option key={item} value="item">
              {item}
            </option>
          ))}
        </select>
      </div>
      <div
        onClick={async () => {
          await performBooking(propertyId);
        }}
        className="cursor-pointer  mb-6 py-6 text-center text-white bg-airbnb hover:bg-airbnb-dark rounded-xl justify-center"
      >
        Book
      </div>
      <div className="mb-4 flex justify-between items-center">
        <p>
          {price_per_night} * {nights} nights
        </p>
        <p>${price_per_night * nights}</p>
      </div>
      <div className="mb-4 flex justify-between items-center">
        <p>Djangobnb fee</p>
        <p>${fee}</p>
      </div>
      <hr />
      <div className="mt-4 flex justify-between items-center font-bold">
        <p>total</p>
        <p>${totalPrice}</p>
      </div>
    </aside>
  );
};

export default ReservationSidebar;
