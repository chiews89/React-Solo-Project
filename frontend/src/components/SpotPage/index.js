import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { getOneSpot } from "../../store/spots";
import { CreateBooking } from "../Booking/CreateBooking/CreateBooking";
import { CreateReviewModal } from "../CreateReview";
import * as FAIcons from "react-icons/fa";
import "./spotPage.css";
import { EditSpotModal } from "../EditSpot";
import { EditReviewModal } from "../EditReview";
import { Favorites } from "../Favorites/Favorites";

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

  useEffect(() => {
    dispatch(getOneSpot(id));
  }, [dispatch, id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!spot) {
    return null;
  }

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
      <div className="spot-page-title">
        <h2 className="-spot-page-title-2">{spot.title}</h2>
        {userId === spot.userId && <span className="spot-edit-modal">
          <EditSpotModal spot={spot} />
        </span>}
      </div>
      <div className="spot-page-subheader">
        <div className="spot-page-star">
          <FAIcons.FaStar className="star-rating" />
        </div>
        <div className="spot-page-rating">{rating}</div>
        <li className="spot-page-review-count">
          {spotReviews.length} {spotReviews.length === 1 ? "Review" : "Reviews"}
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
      <div className="spot-page-house-info">
        <p>
          <div className="spot-page-host">
            {userId !== spot.userId && <Favorites spot={spot} />}
            <h3>
              Hosted by :
              <NavLink to={`/users/${spot?.User?.id}`}>
                {spot?.User?.username}
              </NavLink>
            </h3>
          </div>
          Guests:{spot.guests} Bedrooms:{spot.bedrooms} Bathrooms:
          {spot.bathrooms}
          <div className="spot-page-description">
            <h3>Description</h3>
            <div className="spot-page-description-sub">{spot.description}</div>
          </div>
        </p>
        {userId !== spot.userId && (
          <div className="spot-page-booking">
            <CreateBooking spot={spot} />
          </div>
        )}
      </div>
      <div className="user-review-create-review">
        <h3> User Reviews</h3>
      </div>
      <div className="spot-page-reviews-container">
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
      {userId !== spot.userId && (
        <div className="create-review-button">
          <CreateReviewModal />
        </div>
      )}
      {/* <div className="edit-delete-container" hidden={userId !== spot?.userId}>
        <div>
          <EditSpotModal spot={spot} />
        </div>
      </div> */}
    </div>
  );
};

export default SingleSpot;
