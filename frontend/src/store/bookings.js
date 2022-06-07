import csrfFetch from "./csrf";

const GET_BOOKINGS = "bookings/GET_BOOKINGS";
const CREATE_BOOKING = "bookings/CREATE_BOOKING";

const getBookings = (bookings) => {
  return {
    type: GET_BOOKINGS,
    bookings,
  };
};

const createBooking = (booking) => {
  return {
    type: CREATE_BOOKING,
    booking,
  };
};

export const getAllBookings = () => async (dispatch) => {
  const res = await csrfFetch("/api/bookings/");
  if (res.ok) {
    const data = await res.json();
    dispatch(getBookings(data));
    return data;
  }
};

export const createBookingThunk = (booking) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(booking),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(createBooking(data));
    return data;
  }
};

export const bookingsReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case GET_BOOKINGS:
      newState = { ...state };
      action.bookings.forEach((booking) => {
        newState[booking.id] = booking;
      });
      return newState;
    case CREATE_BOOKING:
      newState = { ...state };
      newState[action.booking.id] = action.booking;
      return newState;
    default:
      return state;
  }
};
