import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getOneSpot, removeSpot } from "../../store/spots";
import UpdateSpot from "../EditSpot/index";
import { getReviews, deleteReview } from "../../store/reviews";
import Reviews from "../CreateReview/createReview";
import EditReview from "../EditReview";

// import EditReview from "../EditReview";

const SingleSpot = () => {
  const userId = useSelector((state) => state.session.user?.id);
  const dispatch = useDispatch();
  const { id } = useParams();
  const spot = useSelector((state) => state.spots[id]);
  const review = useSelector((state) => {
    return state.reviews;
  });
  const reviewsObj = Object.values(review);

  const [showEdit, setShowEdit] = useState(false);

  const history = useHistory();
  const redirect = () => history.replace("/spots");

  useEffect(() => {
    dispatch(getOneSpot(id));
    dispatch(getReviews(id));
  }, [dispatch, id]);

  if (!spot) {
    return null;
  }

  const handleDelete = () => {
    dispatch(removeSpot(id, spot));
    redirect();
  };

  const handleDeleteReview = (id) => {
    reviewsObj.forEach(async (review) => {
      if (id === review.id) {
        return await dispatch(deleteReview(review?.id));
      }
    });
    history.replace(`/spots/${spot.id}`);
  };
  const editSpotClick = () => {
    setShowEdit((prevState) => !prevState);
  };

  return (
    <div>
      <div className="spot-image">
        <img
          alt={spot?.name}
          src={
            spot?.Images[0]
              ? spot?.Images[0].url
              : "https://media.istockphoto.com/vectors/no-image-available-sign-vector-id922962354?k=20&m=922962354&s=612x612&w=0&h=f-9tPXlFXtz9vg_-WonCXKCdBuPUevOBkp3DQ-i0xqo="
          }
        />
      </div>
      <h2> User Reviews</h2>
      {reviewsObj.map((review) => (
        <div key={review.id}>
          {review?.review}
          {review.userId === userId && (
            <div>
              <EditReview reviews={review} />
            </div>
          )}
          {review.userId === userId && (
            <button
              className="delete-review-button"
              onClick={() => handleDeleteReview(review?.id)}
            >
              Delete Review
            </button>
          )}
        </div>
      ))}
      <div hidden={!userId}>
        <Reviews />
      </div>
      <div className="spot-info">
        <p>{spot?.description}</p>
        <div>
          Location: {spot?.city}, {spot?.state}
        </div>
        <div>Price: ${Math.round(spot?.price)} / Day</div>
      </div>
      <div className="edit-delete-container" hidden={userId !== spot?.userId}>
        {userId === spot?.userId && (
          <button className="edit-spot-button" onClick={editSpotClick}>
            Edit
          </button>
        )}
        <div hidden={!showEdit}>
          <UpdateSpot spot={spot} hideForm={() => setShowEdit(false)} />
        </div>
      </div>
      {userId === spot?.userId && (
        <button className="delete-spot-button" onClick={handleDelete}>
          Delete
        </button>
      )}
    </div>
  );
};

export default SingleSpot;
