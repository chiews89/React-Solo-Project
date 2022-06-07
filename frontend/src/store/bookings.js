import csrfFetch from "./csrf";

const GET_BOOKINGS = "bookings/GET_BOOKINGS";

const getBookings = (bookings) => {
  return {
    type: GET_BOOKINGS,
    bookings,
  };
};

export const getAllBookings = () => async (dispatch) => {
  const res = await csrfFetch("/api/bookings/");
  console.log('res', res)
  if (res.ok) {
    const data = await res.json();
    dispatch(getBookings(data));
    console.log('data', data)
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
    default:
      return state;
  }
};
