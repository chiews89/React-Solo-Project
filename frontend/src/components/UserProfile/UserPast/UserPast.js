import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import moment from "moment";

export const UserPast = () => {
  const user = useSelector((state) => state?.session?.user);
  const bookings = Object.values(useSelector((state) => state?.bookings));
  const userBookings = bookings.filter((booking) => {
    return booking.userId === user?.id;
  });

  const pastBookings = userBookings.filter(
    (past) => moment(past.checkIn) < moment()
  );

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
            <li>Your Previous Trips</li>
          </NavLink>
        </div>
        <div className="listing-header">
          <h2>Your Previous Trips</h2>
        </div>
        <div className="no-booking">
        <NavLink to={`/spots`}>Find your next trip</NavLink>
        </div>
      </div>
      <div className="user-listings-container">
        {pastBookings.map((booking) => (
          <div className="profile-user-spots" key={booking?.id}>
            <div className="profile-spot-title">
              <h4>{booking.Spot?.title}</h4>
            </div>
            <div className="profile-spot-image-container">
              <NavLink to={`/spots/${booking.Spot?.id}`}>
                <img
                  className="profile-spot-image"
                  alt={booking.Spot?.id}
                  src={booking.Spot?.Images[0].url}
                />
              </NavLink>
            </div>
            <div className="profile-spot-address">{booking.Spot?.address}</div>
            <div className="profile-spot-address">{booking.Spot?.city}</div>
            <div className="profile-spot-address">{booking.Spot?.state}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
