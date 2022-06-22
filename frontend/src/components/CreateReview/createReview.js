import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createReview } from "../../store/reviews";
import * as FAIcons from "react-icons/fa";
import "./createReview.css";

export const CreateReviews = ({ setShowModal }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const userId = useSelector((state) => state.session.user?.id);
  const spotId = useSelector((state) => state.spots[id].id);
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
      setShowModal(false);
    }
  };


  return (
    <div className="review-form-container">
      <h3 className="review-title">Leave a review</h3>
      <form className="review-form" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, index) => (
            <li className="review-errors" key={index}>
              {error}
            </li>
          ))}
        </ul>
        <div className="review-form-rating-container">
          <h4 className="review-rating">Please Rate from 1 to 5</h4>
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
        <div className="review-label-container">
          <label className="review-label">
            {" "}
            <span className="review-text">Review</span>
            <input
              className="review-input"
              id="description"
              type="text"
              placeholder="Review"
              required
              maxLength="1000"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
          </label>
        </div>
        <div className="review-submit">
          <button
            className="review-submit-button"
            type="submit"
            //   disabled={errorValidator.length > 0}
          >
            Leave Review
          </button>
        </div>
      </form>
    </div>
  );
};
