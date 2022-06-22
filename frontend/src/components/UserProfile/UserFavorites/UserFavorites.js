import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Favorites } from "../../Favorites/Favorites";

export const UserFavorites = ({spot}) => {
  const user = useSelector((state) => state?.session?.user);
  const favorites = Object.values(useSelector((state) => state?.favorites));

  const userFavorites = favorites.filter((favorite) => {
    return favorite?.userId === user?.id;
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
            <li>Your Previous Trips</li>
          </NavLink>
        </div>
        <div className="listing-header">
          <h2>Your Favorites</h2>
        </div>
        {!userFavorites.length && <div className="no-booking">
          <span>No favorites yet!</span>
        </div>}
      </div>
      <div className="user-listings-container">
        {userFavorites.map((favorite) => (
          <div className="profile-user-spots" key={favorite?.id}>
            <div className="profile-spot-title">
              <h4>{favorite?.Spot?.title}</h4>
            </div>
            <div className="profile-spot-image-container">
              <NavLink to={`/spots/${favorite?.Spot?.id}`}>
                <img
                  className="profile-spot-image"
                  onError={noImage}
                  alt={favorite?.Spot?.id}
                  src={favorite?.Spot?.Images[0].url}
                />
              </NavLink>
            </div>
            <Favorites spot={favorite?.Spot?.id}/>
            <div className="profile-spot-address">
              <span className="profile-spot-address-info">{favorite?.Spot?.address}</span>
              <span className="profile-spot-address-info">{favorite?.Spot?.city}</span>
              <span className="profile-spot-address-info">{favorite?.Spot?.state}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
