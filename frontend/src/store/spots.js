import { csrfFetch } from "./csrf";

const LOAD_SPOTS = "spots/LOAD_SPOTS";
const LOAD_ONE = "spots/LOAD_ONE";

const loadAll = (spots) => ({
  type: LOAD_SPOTS,
  spots,
});

const loadOne = (spot) => ({
  type: LOAD_ONE,
  spot,
});
export const getSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots");
  if (response.ok) {
    const spots = await response.json();
    dispatch(loadAll(spots));
    return spots;
  }
};

export const getOneSpot = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${id}`);
  if (response.ok) {
    const spot = await response.json();
    dispatch(loadOne(spot));
    return spot;
  }
};

const spotsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_SPOTS:
      const newState = {};
      action.spots.forEach((spot) => {
        newState[spot.id] = spot;
      });
      return newState;
    case LOAD_ONE:
      const oneState = { ...state };
      oneState[action.spot.id] = action.spot;
      return oneState;
    default:
      return { ...state };
  }
};

export default spotsReducer;
