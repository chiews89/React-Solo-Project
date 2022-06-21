import csrfFetch from "./csrf";

const GET_FAVORITES = "favorites/GET_FAVORITES";
const CREATE_FAVORITE = "favorites/CREATE_FAVORITE";
const DELETE_FAVORITE = "favorites/DELETE_FAVORITE";

const getFavorites = (favorites) => {
  return {
    type: GET_FAVORITES,
    favorites,
  };
};

const createFavoriteAction = (favorite) => {
  return {
    type: CREATE_FAVORITE,
    favorite,
  };
};

const deleteFavoriteAction = (favorite) => {
  return {
    type: DELETE_FAVORITE,
    favorite,
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

export const createFavoriteThunk = (favorite) => async (dispatch) => {
  console.log('favorite', favorite)
  const res = await csrfFetch("/api/favorites/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(favorite),
  });
  if (res.ok) {
    const data = await res.json();
    console.log('data', data)
    dispatch(createFavoriteAction(data));
    return data;
  }
};

export const deleteFavoriteThunk = (favoriteId) => async (dispatch) => {
  const res = await csrfFetch(`/api/favorites/${favoriteId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    const data = await res.json();
    console.log('data', data)
    dispatch(deleteFavoriteAction(favoriteId));
    return data;
  }
};

export const favortiesReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case GET_FAVORITES:
      newState = { ...state };
      action.favorites.forEach((favorite) => {
        newState[favorite.id] = favorite;
      });
      return newState;
    case CREATE_FAVORITE:
      newState = { ...state };
      newState[action.favorite.id] = action.favorite;
      return newState;
    case DELETE_FAVORITE:
      const removeState = { ...state };
      delete removeState[action.favorite];
      return removeState;
    default:
      return state;
  }
};
