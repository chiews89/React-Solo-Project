import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export const UserFavorites = () => {
  const user = useSelector((state) => state?.session?.user);
  const favorites = useSelector((state) => state?.favorites);
  console.log("favorites", favorites);

  if (!user) {
    return null;
  }
  return (
    <div className="favorites-page-container">
      <div className="profile-page-header">
        <h1>Welcome back {user.username}</h1>
        <NavLink to={`/${user.id}`} exact={true}>
          <li>Your Listings</li>
        </NavLink>
        <NavLink to={`/${user.id}/favorites`} exact={true}>
          <li>Your Favorites</li>
        </NavLink>
        <NavLink to={`/${user.id}/upcoming`} exact={true}>
          <li>Your Upcoming Trips</li>
        </NavLink>
        <NavLink to={`/${user.id}/past`} exact={true}>
          <li>Your Past Trips</li>
        </NavLink>
        <h2>Your listings</h2>
      </div>
    </div>
  );
};
