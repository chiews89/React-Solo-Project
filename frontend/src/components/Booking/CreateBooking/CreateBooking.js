import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { BsCalendar } from "react-icons/bs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createNewBooking } from "../../../store/bookings";
import './CreateBooking.css'

export const CreateBooking = ({ spot }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.session.user?.id);

  const [guests, setGuests] = useState(1);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const today = new Date()
  const tomorrow = new Date()
  tomorrow.setDate(today.getDate() + 1)

  const bookingSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      spotId: spot.id,
      userId: user,
      guests,
      checkIn,
      checkOut,
    };
    console.log('payload', payload)
    const booking = await dispatch(createNewBooking(payload));
    if (booking) {
      history.push(`/users/${user}/upcoming`);
    }
  };

  return (
    <div className="create-booking-container">

      <h4 className="booking-price">${spot?.price} / <span className="spot-night"> night</span></h4>
      <form className="create-booking-form" onSubmit={bookingSubmit}>
        <div className="create-booking-dates-container">
          <label className="calendar-icon">
            <BsCalendar />
          </label>
          <DatePicker
            className="check-in-date"
            startDate={checkIn}
            endDate={checkOut}
            selected={checkIn}
            selectsStart
            placeholderText="Check-in Date"
            minDate={today}
            onChange={(range) => setCheckIn(range)}
          />
          <label className="calendar-icon2">
            <BsCalendar />
          </label>
          <DatePicker
            className="check-out-date"
            startDate={checkIn}
            endDate={checkOut}
            selected={checkOut}
            selectsEnd
            placeholderText="Check-out Date"
            minDate={tomorrow}
            onChange={(range) => setCheckOut(range)}
          />
        </div>
        <div className="guests-amount">
          <label className="select-guests-label">Guests</label>
          <select
            className="number-of-guests"
            defaultValue={guests}
            onChange={(event) => setGuests(event.target.value)}
          >
            {[...Array(spot?.guests).keys()].map((num, i) => (
              <option key={i}>{num + 1}</option>
            ))}
          </select>
        </div>
        {user && (
          <button className="booking-reserve-button" type="submit">
            Book
          </button>
        )}
      </form>
    </div>
  );
};
