import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createReview } from "../../store/reviews";
import * as FAIcons from "react-icons/fa";
import "./createReview.css";

export const CreateReviews = ({setShowModal}) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const userId = useSelector((state) => state.session.user?.id);
  const spotId = useSelector((state) => state.spots[id].id);
  const history = useHistory();
  const [hover, setHover] = useState(null);
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
      setShowModal(false)
      reset()
    }
  };
  const reset = () => {
    setRating(0);
    setReview("");
  };

  return (
    <div className="reviews_main_container">
      <div className="all_reviews_container">
        <h3>Submit your review</h3>
        <form className="reviews_form" onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
          <div className="review-form-rating-container">
            <label>Please Rate from 1 to 5</label>
            <div className="review-form-rating-field-container">
              {[...Array(5)].map((star, i) => (
                <label>
                  <input
                    className="review-form-rating-radio-buttons"
                    type="radio"
                    required
                    value={rating}
                    onClick={() => setRating(i + 1)}
                  />
                  <FAIcons.FaStar
                    color={i + 1 <= (hover || rating) ? "red" : "lightgray"}
                    className="review-form-rating-icons"
                    onMouseEnter={() => setHover(i + 1)}
                    onMouseLeave={() => setHover(null)}
                    required
                  />
                </label>
              ))}
            </div>
          </div>
          <div className="review">
            <label> Review </label>
            <input
              type="text"
              placeholder="Review"
              required
              row="40"
              column="50"
              maxLength="1000"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
          </div>
          <button
            className="create-review-button"
            type="submit"
            //   disabled={errorValidator.length > 0}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
