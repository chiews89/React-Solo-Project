import { csrfFetch } from "./csrf";

const LOAD = "spots/LOAD";
const LOAD_ONE = "spots/LOAD_ONE";
const CREATE = "spots/CREATE";
const EDIT = "rides/EDIT";
const DELETE = "rides/DELETE";

const load = (spots) => ({
  type: LOAD,
  spots,
});

const loadOne = (spot) => ({
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

const deleteOne = (spotId) => ({
  type: DELETE,
  spotId,
});

export const getSpots = () => (dispatch) => {
    const response = await fetch('/api/spots')
}
