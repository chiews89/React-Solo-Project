import csrfFetch from "./csrf";

const GET_FAVORITES = "favorites/GET_FAVORITES";

const getFavorites = (favorites) => {
  return {
    type: GET_FAVORITES,
    favorites,
  };
};

export const getAllFavorites = () => async (dispatch) => {
  const res = await csrfFetch("/api/favorites/");
  if (res.ok) {
    const data = await res.json();
    dispatch(getFavorites(data));
    return data;
  }
};

export const favortiesReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case GET_FAVORITES:
      newState = { ...state };
      action.bookings.forEach((favorite) => {
        newState[favorite.id] = favorite;
      });
      return newState;
    default:
      return state;
  }
};
