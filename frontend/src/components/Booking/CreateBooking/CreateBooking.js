import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const CreateBooking = ({ spot }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const bookings = useSelector((state) => state?.bookings);
  const [guests, setGuests] = useState(1);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOuut] = useState("");

  const today = new Date()
  const tomorrow = new Date()
  tomorrow.setDate(today.getDate() + 1)
};
