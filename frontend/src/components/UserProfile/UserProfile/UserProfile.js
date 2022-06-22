import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { EditSpotModal } from "../../EditSpot";
import "./UserProfile.css";

export const UserProfile = ({spot}) => {
  const { userId } = useParams();
  const user = useSelector((state) => state?.users[userId]);
  const sessionUser = useSelector((state) => state?.session.user);
  const spots = Object.values(useSelector((state) => state?.spots));

  const userSpots = spots.filter((spot) => {
    return spot.userId === user?.id;
  });

  if (!user) {
    return null;
  }

  const noImage = (e) => {
    e.target.src = "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
  }


  return (
    <div className="profile-page-container">
      <div className="profile-page-header">
        {sessionUser?.id === user.id ? (
          <h1>Welcome back {user?.username}</h1>
        ) : (
          <h1>User Profile</h1>
        )}
        {sessionUser?.id === user?.id ? (
          <div className="profile-links">
            <NavLink to={`/users/${user?.id}`}>
              <li>Your Listings</li>
            </NavLink>
            <NavLink to={`/users/${user?.id}/favorites`}>
              <li>Your Favorites</li>
            </NavLink>
            <NavLink to={`/users/${user?.id}/upcoming`}>
              <li>Your Upcoming Trips</li>
            </NavLink>
            <NavLink to={`/users/${user?.id}/past`}>
              <li>Your Previous Trips</li>
            </NavLink>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      {sessionUser?.id === user.id ? (
        <div className="listing-header">
          <h2>Your Listings</h2>
        </div>
      ) : (
        <h2 className="listing-header"> {user?.username}'s Listings </h2>
      )}
      <div className="user-listings-container">
        {userSpots.map((spot) => (
          <div className="profile-user-spots" key={spot?.id}>
            <div className="profile-spot-title">
              <h4>{spot?.title}</h4>
              <span className="profile-edit-modal"><EditSpotModal spot = {spot}/></span>
            </div>
            <div className="profile-spot-image-container">
              <NavLink to={`/spots/${spot?.id}`}>
                <img
                  className="profile-spot-image"
                  alt={spot?.id}
                  onError={noImage}
                  src={spot?.Images[0].url}
                />
              </NavLink>
            </div>
            <div className="profile-spot-address">
              <span className="profile-spot-address-info">{spot?.address}
              </span>
              <span className="profile-spot-address-info">{spot?.city}</span>
              <span className="profile-spot-address-info">{spot?.state}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
