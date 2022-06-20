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
        <form className="edit-review" onSubmit={handleSubmit}>
          <div className="review-form-rating-container">
            <label>Please Rate from 1 to 5</label>
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
          <div className="review">
            <label> Review </label>
            <input
              id="form-label"
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
          <ul>
            {errorValidator.map((error) => (
              <li className="error-list" key={error}>
                {error}
              </li>
            ))}
          </ul>
          <button
            className="edit-spot-button"
            type="submit"
            disabled={errorValidator.length > 0}
          >
            Edit
          </button>
          <button className="delete-spot-button" onClick={handleDelete}>
            Delete
          </button>
        </form>
      </div>
    </>
  );
};

export default EditReview;
