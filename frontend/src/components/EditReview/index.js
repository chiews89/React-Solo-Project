import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { updateReview } from "../../store/reviews";

const EditReview = ({ reviews, hideForm }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const user = useSelector((state) => state.session.user);
  const spotId = useSelector((state) => state.spots[id].id);

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
          {/* <div className="rating">
            <label>Rating</label>
            <input
              type="number"
              placeholder="Rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
          </div> */}
          <div className="review">
            <label>Edit Review</label>
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
            disabled={errorValidator.length > 0}
          >
            Edit
          </button>
        </form>
      </div>
    </>
  );
};

export default EditReview;
