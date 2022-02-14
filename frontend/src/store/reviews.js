import { csrfFetch } from "./csrf";

const EDIT_REVIEW = "reviews/EDIT_REVIEW";
const GET_REVIEWS = "reviews/GET_REVIEWS";
const CREATE_REVIEW = "reviews/CREATE_REVIEW";
const DELETE_REVIEW = "reviews/DELETE_REVIEW";

const getAllReviews = (reviews) => {
  return {
    type: GET_REVIEWS,
    reviews,
  };
};

const create = (review) => ({
  type: CREATE_REVIEW,
  review,
});
const editReview = (reviewId) => ({
  type: EDIT_REVIEW,
  reviewId,
});

const removeReview = (reviewId) => ({
  type: DELETE_REVIEW,
  reviewId,
});

export const getReviews = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/spots/${spotId}`);
  if (response.ok) {
    const reviews = await response.json();
    dispatch(getAllReviews(reviews));
  }
};

export const createReview = (payload) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/spots/${payload.spotId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    const review = await response.json();
    dispatch(create(review));
    return review;
  }
};

export const updateReview = (reviewId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/spots/${reviewId.spotId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reviewId)
  });
  if (response.ok) {
    const reviewId = await response.json();
    dispatch(editReview(reviewId));
    return reviewId;
  }
};

export const deleteReview = (reviewId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/spots/${reviewId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const reviewId = await response.json();
    dispatch(removeReview(reviewId));
    return reviewId;
  }
};

const reviewsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_REVIEWS:
      const allState = {};
      action.reviews.forEach((review) => {
        allState[review.id] = review;
      });
      return allState;
    case CREATE_REVIEW:
      const newState = { ...state };
      newState[action.review.id] = action.review;
      return newState;
    case EDIT_REVIEW:
      const editState = { ...state };
      editState[action.reviewId.id] = action.reviewId;
      return editState;
    case DELETE_REVIEW:
      const removeState = { ...state };
      delete removeState[action.reviewId];
      return removeState;
    default:
      return { ...state };
  }
};

export default reviewsReducer;
