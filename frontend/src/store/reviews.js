import { csrfFetch } from "./csrf";

const LOAD_REVIEWS = "reviews/Load_REVIEWS";
const EDIT_REVIEW = "reviews/EDIT_REVIEW";

const editReview = (review) => ({
  type: EDIT_REVIEW,
  review,
});

export const getReviews = (spotId) => async (dispatch) => {
    const  res = await csrfFetch(`/api/spots/${spotId}/reviews`);
    if (res.ok) {
        const reviews = await res.json();
        dispatch(getAllReviews(reviews))
    }
}


export const updateReview = (spotId, review) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/${review}`, {
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
    case EDIT_REVIEW:
      const editState = { ...state };
      editState[action.review.id] = action.review;
      return editState;
    default:
      return { ...state };
  }
};

export default reviewsReducer;
