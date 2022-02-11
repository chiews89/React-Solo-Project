import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { updateReview } from "../../store/reviews";
import Rating from "react-simple-star-rating";

const EditSpot = ({ review, hideForm }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const [rating, setRating] = useState(review?.rating);
  const [review, setReview] = useState(review?.review);
  const [errorValidator, setErrorValidator] = useState([]);

  useEffect(() => {
    const errors = [];

    if (!rating?.rate) errors.push("Please provide a rating");
    if (!review?.length) errors.push("Please provide a review");
    setErrorValidator(errors);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      userId: user.id,
      rating,
      review,
    };
    const updatedReview = await dispatch(updateReview(payload));
    if (updatedReview) {
      if (updatedReview) hideForm();
    }
    const handleRating = (rate) => {
      setRating(rate);
    };
  };

  return (
    <>
      <div className="edit-review-container">
        <form className="edit-review" onSubmit={handleSubmit}>
          <ul>
            {errorValidator.map((error) => (
              <li className="error-list" key={error}>
                {error}
              </li>
            ))}
          </ul>
          <div className="rating">
            <label>
              <Rating
              type=""
              />
            </label>
          </div>
          <div className="review">
            <label>Review</label>
            <textarea
              type="text"
              placeholder="Review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
          </div>
        </form>
      </div>
    </>
  );
};
