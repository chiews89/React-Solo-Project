import { csrfFetch } from "./csrf";

const LOAD_SPOTS = "spots/LOAD_SPOTS";

const loadAll = (spots) => ({
  type: LOAD_SPOTS,
  spots,
});

export const getSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots");
  if (response.ok) {
    const spots = await response.json();

    dispatch(loadAll(spots));
    return spots;
  }
};


const spotsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_SPOTS:
      const newState = {}
      action.spots.forEach((spot) => {
        newState[spot.id] = spot;
      });
      return newState;
    default:
      return { ...state };
  }
};

export default spotsReducer;
