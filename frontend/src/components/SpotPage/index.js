import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, NavLink } from "react-router-dom";
import { getOneSpot, removeSpot } from "../../store/spots";
import UpdateSpot from "../EditSpot/index";
import { getReviews, deleteReview } from "../../store/reviews";
import Reviews from "../CreateReview/createReview";
import EditReview from "../EditReview";
import { CreateBooking } from "../Booking/CreateBooking/CreateBooking";
import { AllFavorites } from "../Favorites";
import * as AiIcons from "react-icons/ai";

import "./spotPage.css";

const SingleSpot = () => {
  const userId = useSelector((state) => state.session.user?.id);
  const dispatch = useDispatch();
  const { id } = useParams();
  const spot = useSelector((state) => state.spots[id]);
  const review = useSelector((state) => {
    return state.reviews;
  });
  const reviewsArr = Object.values(review);
  const spotReviews = reviewsArr.filter((review) => review.spotId === spot.id);

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
    reviewsArr.forEach(async (review) => {
      if (id === review.id) {
        return await dispatch(deleteReview(review?.id));
      }
    });
    history.replace(`/spots/${spot.id}`);
  };
  const editSpotClick = () => {
    setShowEdit((prevState) => !prevState);
  };

  const overallRating = (spotReviews) => {
    return spotReviews?.reduce(function (prevValue, review) {
      return prevValue + review.rating;
    }, 0);
  };

  let rating = Math.round(overallRating(spotReviews) / spotReviews.length);

  if (Number.isNaN(rating)) {
    rating = "Unrated";
  }

  return (
    <div className="spot-page-container">
      {/* <AllFavorites spot={spot}/> */}
      <div className="spot-page-title">
        <h2>{spot.title}</h2>
      </div>
      <div className="spot-page-subheader">
        <p className="spot-page-star">
          <AiIcons.AiFillStar className="star-rating" />
          {rating}
        </p>
        <p className="spot-page-review-amount">{reviewsArr.length} Reviews</p>
        <p className="spot-page-address-info">
          {spot.address}
          {spot.city},{spot.state}
        </p>
      </div>
      <div className="spot-page-image">
        <img
          className="spot-page-image"
          alt={spot?.name}
          src={
            spot?.Images[0]
              ? spot?.Images[0].url
              : "https://media.istockphoto.com/vectors/no-image-available-sign-vector-id922962354?k=20&m=922962354&s=612x612&w=0&h=f-9tPXlFXtz9vg_-WonCXKCdBuPUevOBkp3DQ-i0xqo="
          }
        />
      </div>
      <div className="spot-page-host">
        <h3>Hosted by :
          {/* {spot?.User?.username} */}
          </h3>
      </div>
      <div className="spot-page-house-info">
        <p>
          Guests:{spot.guests} Bedrooms:{spot.bedrooms} Bathrooms:
          {spot.bathrooms}
        </p>
      </div>
      <div className="spot-page-reviews-container">
        <h2> User Reviews</h2>
        {reviewsArr.map((review) => (
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
        {userId !== spot.userId && (
          <div className="create-review-button">
            <Reviews />
          </div>
        )}
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
      {userId !== spot.userId && (
        <div className="spot-page-booking">
          <CreateBooking spot={spot} />
        </div>
      )}
    </div>
  );
};

export default SingleSpot;
