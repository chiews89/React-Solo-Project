import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { BsCalendar } from "react-icons/bs";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createNewBooking } from "../../../store/bookings";

export const CreateBooking = ({ spot }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.session.user?.id);

  const bookings = useSelector((state) => state?.bookings);
  const [guests, setGuests] = useState(1);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOuut] = useState("");

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const bookingSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      spotId: spot.id,
      userId: user.id,
      guests,
      checkIn,
      checkOut,
    };
    const booking = await dispatch(createNewBooking(payload));
    if (booking) {
      history.push(`/users/${user.id}`);
    }
  };

  return (
    <div className="create-booking-container">
        <span className="booking-price">
            ${spot?.price} /night
        </span>
      <form className="create-booking-form" onSubmit={bookingSubmit}>
        <div className="create-booking-dates-container">
            <label className="calendar-icon">
                <BsCalendar/>
            </label>
            <DatePicker
            className="check-in-date"
            startDate={checkIn}
            endDate={checkOut}
            selected={checkIn}
            selectsStart
            placeholderText="Check-in Date"
            minDate={new Date ()}
            onChange={(range) => setCheckIn(range)}
            />
        </div>
      </form>
    </div>
  );
};
