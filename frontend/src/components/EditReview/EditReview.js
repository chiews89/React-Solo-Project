import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteReview, updateReview } from "../../store/reviews";
import * as FAIcons from "react-icons/fa";

const EditReview = ({ reviews, setShowModal }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const user = useSelector((state) => state.session.user);
  const spotId = useSelector((state) => state.spots[id].id);
  const [hover, setHover] = useState(null);
  const [rating, setRating] = useState(reviews?.rating);
  const [review, setReview] = useState(reviews?.review);
  const [errorValidator, setErrorValidator] = useState([]);

  useEffect(() => {
    const errors = [];
    if (!review?.length) errors.push("Please provide a review");
    setErrorValidator(errors);
  }, [rating, review]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      id: reviews.id,
      userId: user.id,
      spotId: spotId,
      rating,
      review,
    };

    const updatedReview = await dispatch(updateReview(payload));
    if (updatedReview) {
      setShowModal(false);
    }
  };
  const handleDelete = () => {
    dispatch(deleteReview(reviews.id));
    setShowModal(false);
  };

  return (
    <>
      <div className="edit-review-container">
        <h3 className="edit-review-title">Edit Your Review</h3>
        <form className="edit-review-form" onSubmit={handleSubmit}>
          <ul>
            {errorValidator.map((error) => (
              <li className="edit-review-errors" key={error}>
                {error}
              </li>
            ))}
          </ul>
          <div className="review-form-rating-container">
            <h4 className="edit-review-rating">Please Rate from 1 to 5</h4>
            <div className="review-form-rating-field-container">
              {[...Array(5)].map((star, i) => (
                <label>
                  <input
                    className="review-form-rating-radio-buttons"
                    type="radio"
                    value={rating}
                    onClick={() => setRating(i + 1)}
                  />
                  <FAIcons.FaStar
                    color={i + 1 <= (hover || rating) ? "red" : "lightgray"}
                    className="review-form-rating-icons"
                    onMouseEnter={() => setHover(i + 1)}
                    onMouseLeave={() => setHover(null)}
                  />
                </label>
              ))}
            </div>
          </div>
          <div className="review-label-container">
            <label className="edit-review-label">
              {" "}
              <span className="edit-review-text">Review</span>
              <input
                className="edit-review-input"
                type="text"
                placeholder="Review"
                required
                maxLength="1000"
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
            </label>
          </div>
          <div className="edit-review-submit">
            <button
              className="edit-review-submit-button"
              type="submit"
              disabled={errorValidator.length > 0}
            >
              Edit
            </button>
          </div>
          <div className="delete-review-submit">
            <button
              className="delete-review-submit-button"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditReview;
