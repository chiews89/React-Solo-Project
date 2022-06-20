import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./UserProfile.css";

export const UserProfile = () => {
  const user = useSelector((state) => state?.session?.user);
  const spots = Object.values(useSelector((state) => state?.spots));

  const userSpots = spots.filter((spot) => {
    return spot.userId === user?.id;
  });


  if (!user) {
    return null;
  }

  return (
    <div className="profile-page-container">
      <div className="profile-page-header">
        <h1>Welcome back {user.username}</h1>
        <div className="profile-links">
          <NavLink to={`/users/${user.id}`}>
            <li>Your Listings</li>
          </NavLink>
          <NavLink to={`/users/${user.id}/favorites`}>
            <li>Your Favorites</li>
          </NavLink>
          <NavLink to={`/users/${user.id}/upcoming`}>
            <li>Your Upcoming Trips</li>
          </NavLink>
          <NavLink to={`/users/${user.id}/past`}>
            <li>Your Past Trips</li>
          </NavLink>
        </div>
      </div>
      <div className="listing-header">
        <h2>Your Listings</h2>
      </div>
      <div className="user-listings-container">
        {userSpots.map((spot) => (
          <div className="profile-user-spots" key={spot?.id}>
            <div className="profile-spot-title">
              <h4>{spot?.title}</h4>
            </div>
            <div className="profile-spot-image-container">
              <NavLink to={`/spots/${spot?.id}`}>
                <img
                  className="profile-spot-image"
                  width={500}
                  height={500}
                  alt={spot?.id}
                  src={spot?.Images[0].url}
                />
              </NavLink>
            </div>
            <div className="profile-spot-address">{spot?.address}</div>
            <div className="profile-spot-address">{spot?.city}</div>
            <div className="profile-spot-address">{spot?.state}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
