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

const initialState = { spots : {} }
const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SPOTS:
      let newState;
      newState = {...state};
      const spotsList = {}
      action.spots.forEach((spot) => {
        spotsList[action.spot.id] = spot;
      });
      newState.spots = spotsList
      return newState;
    default:
      return { ...state };
  }
};

export default spotsReducer;
