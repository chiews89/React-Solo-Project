import { csrfFetch } from "./csrf";

const LOAD_SPOTS = "spots/LOAD_SPOTS";
const LOAD_ONE = "spots/LOAD_ONE";
const CREATE = "spots/CREATE";
const EDIT = "spots/EDIT";
const DELETE = "spots/DELETE";

const loadAll = (spots) => ({
  type: LOAD_SPOTS,
  spots,
});

const getOne = (spot) => ({
  type: LOAD_ONE,
  spot,
});

const create = (spot) => ({
  type: CREATE,
  spot,
});

const edit = (spot) => ({
  type: EDIT,
  spot,
});

const deleteOne = (spot) => ({
  type: DELETE,
  spot,
});

export const getSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots");
  if (response.ok) {
    const spots = await response.json();
    dispatch(loadAll(spots));
    return spots
  }
};



const spotsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_SPOTS:
        const newState = {};
        action.spots.forEach(spot => {
            newState[spot.id] = spot;
        })
        return newState;
    default:
        return { ...state };
}
}

export default spotsReducer;
