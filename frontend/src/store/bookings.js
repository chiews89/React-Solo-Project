import csrfFetch from "./csrf";

const GET_BOOKINGS = "bookings/GET_BOOKINGS";
const CREATE_BOOKING = "bookings/CREATE_BOOKING";
const DELETE_BOOKING = "bookings/DELETE_BOOKING";

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

const deleteBooking = (bookingId) => {
  return {
    type: DELETE_BOOKING,
    bookingId,
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

export const createNewBooking = (booking) => async (dispatch) => {
  const res = await csrfFetch(`/api/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(booking),
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(createBooking(data));
    return data;
  }
};

export const deleteABooking = (bookingId) => async (dispatch) => {
  const res = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(deleteBooking(bookingId));
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
    case DELETE_BOOKING:
      const removeState = { ...state };
      delete removeState[action.bookingId];
      return removeState;
    default:
      return state;
  }
};
