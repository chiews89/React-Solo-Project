import { csrfFetch } from "./csrf";

const LOAD_SPOTS = "spots/LOAD_SPOTS";
const LOAD_ONE = "spots/LOAD_ONE";
const CREATE_SPOT = "spots/CREATE_SPOT"
const EDIT_SPOT = "spots/EDIT_SPOT"

const loadAll = (spots) => ({
  type: LOAD_SPOTS,
  spots,
});

const loadOne = (spot) => ({
  type: LOAD_ONE,
  spot,
});

const createSpot = (spot) => ({
  type: CREATE_SPOT,
  spot
})

const updateSpot = (spot) => ({
  type: EDIT_SPOT,
  spot
})

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

export const createNewSpot = (spot) => async (dispatch) => {
  const response = await csrfFetch ('/api/spots', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(spot)
  })
  if (response.ok) {
    const spot = await response.json();
    dispatch(createSpot(spot))
    return spot
  }
}

export const editSpot = (spot) => async (dispatch) => {

  const response = await csrfFetch(`/api/spots/${spot.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(spot)
  })
  if (response.ok) {

    const spot = await response.json()
    dispatch(updateSpot(spot))
    return spot
  }
}

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
    case CREATE_SPOT:
      const createState = {...state }
      createState[action.spot.id] = action.spot
      return createState
    case EDIT_SPOT:
      const editState = {...state }
      editState[action.spot.id] = action.spot
      return editState
    default:
      return { ...state };
  }
};

export default spotsReducer;
