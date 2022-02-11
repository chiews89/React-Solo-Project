import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createReview } from "../../store/reviews";

function Reviews() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const userId = useSelector((state) => state.session.user?.id);
  const spotId = useSelector((state) => state.spots[id]);
  const history = useHistory();
  const [errors, setErrors] = useState([]);

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      userId,
      spotId,
      rating,
      review,
    };
    const newReview = await dispatch(createReview(payload));
    if (newReview) {
      history.push(`/spots/${newReview.id}`);
      reset();
    }
  };
  const reset = () => {
    setRating(0);
    setReview("");
  };

  const cancelButton = (e) => {
    history.push(`/spots/`);
  };

  return (
    <div className="reviews_main_container">
      <div className="all_reviews_container">
        <h3>Share your review</h3>
        <form className="reviews_form" onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
          <div className="review">
            <label> Review </label>
            <textarea
              type="text"
              placeholder="Review"
              // required
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
          </div>
          <div className="rating">
            <label> Rating </label>
            <textarea
              type="number"
              placeholder="Rating"
              // required
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
          </div>
          <button
            className="create-review-button"
            type="submit"
            //   disabled={errorValidator.length > 0}
          >
            Submit
          </button>
          <button
            className="cancel-review-button"
            type="true"
            onClick={cancelButton}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default Reviews;
