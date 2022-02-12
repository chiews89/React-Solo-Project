import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { updateReview } from "../../store/reviews";
// import Rating from "react-simple-star-rating";

const EditReview = ({ reviews, hideForm }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const spot = useSelector((state) => state.session.spot);

  const [rating, setRating] = useState(reviews?.rating);
  const [review, setReview] = useState(reviews?.review);
  const [errorValidator, setErrorValidator] = useState([]);

  useEffect(() => {
    const errors = [];

    if (!rating?.rate) errors.push("Please provide a rating");
    if (!review?.length) errors.push("Please provide a review");
    setErrorValidator(errors);
  }, [rating, review]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      userId: user.id,
      spotId: spot.id,
      rating,
      review,
    };
    const updatedReview = await dispatch(updateReview(payload));
    if (updatedReview) {
      if (updatedReview) hideForm();
    }
  };
  //   const handleRating = (rate) => {
  //     setRating(rate);
  //   };
  // };

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
            <label>Rating</label>
            <input
              type="number"
              placeholder="Rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
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
          <button
            className="edit-spot-button"
            type="submit"
            // disabled={errorValidator.length > 0}
          >
            Submit
          </button>
          <button
            className="cancel-edit-button"
            type="true"
            to={`/spots/${spot.id}`}
          >
            Cancel
          </button>
        </form>
      </div>
    </>
  );
};

export default EditReview;
