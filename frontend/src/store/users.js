import { csrfFetch } from "./csrf";
const GET_USERS = "session/GET_USERS";

const getUsers = (users) => {
  return {
    type: GET_USERS,
    users,
  };
};

export const getAllUsers = () => async (dispatch) => {
  const res = await csrfFetch("/api/users");
  if (res.ok) {
    const data = await res.json();
    dispatch(getUsers(data));
    return data;
  }
};

export const usersReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case GET_USERS:
      newState = { ...state };
      action.users.forEach((user) => {
        newState[user.id] = user;
      });
      return newState;
    default:
      return state;
  }
};
