import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, NavLink } from "react-router-dom";
import { getOneSpot, removeSpot } from "../../store/spots";
import { getReviews, deleteReview } from "../../store/reviews";
import EditReview from "../EditReview/EditReview";
import { CreateBooking } from "../Booking/CreateBooking/CreateBooking";
import { CreateReviewModal } from "../CreateReview";
import * as FAIcons from "react-icons/fa";
import "./spotPage.css";
import { EditSpotModal } from "../EditSpot";
import { EditReviewModal } from "../EditReview";

const SingleSpot = () => {
  const userId = useSelector((state) => state.session.user?.id);
  const dispatch = useDispatch();
  const { id } = useParams();
  const spot = useSelector((state) => state.spots[id]);
  const review = useSelector((state) => {
    return state.reviews;
  });
  const spotsReview = Object.values(review);
  const spotReviews = spotsReview.filter(
    (review) => review?.spotId === spot?.id
  );
  const favorites = useSelector((state) => state.favorites);

  const history = useHistory();

  useEffect(() => {
    dispatch(getOneSpot(id));
    dispatch(getReviews(id));
  }, [dispatch, id]);

  if (!spot) {
    return null;
  }

  const handleDeleteReview = (id) => {
    spotsReview.forEach(async (review) => {
      if (id === review.id) {
        return await dispatch(deleteReview(review?.id));
      }
    });
    history.replace(`/spots/${spot.id}`);
  };

  let sum = 0;
  spotReviews.forEach(({ rating }) => {
    sum += rating;
  });

  const reviewsAvg = sum / spotReviews.length;

  let rating = Math.round(reviewsAvg * 100) / 100;

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
        <div className="spot-page-star">
          <FAIcons.FaStar className="star-rating" />
        </div>
        <div className="spot-page-rating">{rating}</div>
        <li className="spot-page-review-count">
          {spotsReview.length} {spotsReview.length === 1 ? "Review" : "Reviews"}
        </li>
        <div className="spot-page-address-info">
          {spot.address} {spot.city}, {spot.state}
        </div>
      </div>
      <div className="spot-page-image">
        <img
          className="spot-page-image"
          alt={spot.name}
          src={
            spot.Images[0]
              ? spot?.Images[0].url
              : "https://media.istockphoto.com/vectors/no-image-available-sign-vector-id922962354?k=20&m=922962354&s=612x612&w=0&h=f-9tPXlFXtz9vg_-WonCXKCdBuPUevOBkp3DQ-i0xqo="
          }
        />
      </div>
      <div className="spot-page-host">
        <h3>Hosted by : {spot.User.username}</h3>
      </div>
      <div className="spot-page-house-info">
        <p>
          Guests:{spot.guests} Bedrooms:{spot.bedrooms} Bathrooms:
          {spot.bathrooms}
        </p>
      </div>
      <div className="spot-page-description">
        <h3>Description</h3>
        <div className="spot-page-description-sub">{spot.description}</div>
      </div>
      <div className="spot-page-reviews-container">
        <h2> User Reviews</h2>
        {userId !== spot.userId && (
          <div className="create-review-button">
            <CreateReviewModal />
          </div>
        )}
        {spotReviews.map((review) => (
          <div key={review?.id}>
            <p className="display-ratings-container">
              {" "}
              Rating:{" "}
              {[...Array(5)].map((star, i) => (
                <FAIcons.FaStar
                  key={i}
                  className="display-rating-icons"
                  color={i + 1 <= review?.rating ? "red" : "lightgray"}
                />
              ))}
            </p>
            {review?.review}
            {review?.userId === userId && (
              <div>
                <EditReviewModal reviews={review} />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="edit-delete-container" hidden={userId !== spot?.userId}>
        <div>
          <EditSpotModal spot={spot} />
        </div>
      </div>
      {userId !== spot.userId && (
        <div className="spot-page-booking">
          <CreateBooking spot={spot} />
        </div>
      )}
    </div>
  );
};

export default SingleSpot;
