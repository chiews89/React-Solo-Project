import { csrfFetch } from "./csrf";
// import Reviews from "../components/CreateReview/createReview";

const EDIT_REVIEW = "reviews/EDIT_REVIEW";
const GET_REVIEWS = "reviews/GET_REVIEWS";
const CREATE_REVIEW = "reviews/CREATE_REVIEW";

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
const editReview = (review) => ({
  type: EDIT_REVIEW,
  review,
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

export const updateReview = (spotId, review) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    const review = await response.json();
    dispatch(editReview(review));
    return review;
  }
};

const reviewsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_REVIEWS:
      const allReviews = {};
      action.reviews.forEach((review) => {
        allReviews[review.id] = review;
      });
      return allReviews;
    case CREATE_REVIEW:
      const newReview = { ...state };
      newReview[action.review.id] = action.review;
      return newReview;
    case EDIT_REVIEW:
      const editState = { ...state };
      editState[action.review.id] = action.review;
      return editState;
    default:
      return { ...state };
  }
};

export default reviewsReducer;
