import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import moment from "moment";

export const UserProfile = () => {
  const user = useSelector((state) => state?.session?.user);
  const spots = Object.values(useSelector((state) => state?.spots));
  const bookings = Object.values(useSelector((state) => state?.bookings));

  const userSpots = spots.filter((spot) => {
    return spot.userId === user?.id;
  });

  const userBookings = bookings.filter((booking) => {
    return booking.userId === user?.id;
  });

  const pastBookings = userBookings.filter(
    (past) => moment(past.checkIn) < moment()
  );
  const upcomingBookings = userBookings.filter(
    (upcoming) => moment(upcoming.checkIn) > moment()
  );

  console.log("upcoming", upcomingBookings);

  if (!user) {
    return null;
  }

  return (
    <div className="profile-page-container">
      <div className="profile-page-header">
        <h1>Welcome back {user.username}</h1>
      </div>
      <div className="user-listings-container">
        <h2>Your listings</h2>
        {userSpots.map((spot) => (
          <div className="profile-user-spots" key={spot.id}>
            <div className="profile-spot-title">
              <h4>{spot?.title}</h4>
            </div>
            <div className="profile-spot-image-container">
              <NavLink to={`/spots/${spot.id}`}>
                <img
                  className="profile-spot-image"
                  width={"auto"}
                  height={500}
                  alt={spot?.id}
                  src={spot?.Images[0].url}
                />
              </NavLink>
            </div>
            <div className="profile-spot-address">{spot?.address}</div>
            <div className="profile-spot-address">{spot?.city}</div>
            <div className="profile-spot-address">{spot?.state}</div>
            <div className="profile-spot-address">{spot?.zipcode}</div>
          </div>
        ))}
      </div>
      <h4> Your upcoming trips</h4>
      <div className="profile-page-bookings">
        <div className="upcoming-bookings">
            {/* {upcomingBookings.map((booking) => (
{}
            ))} */}
        </div>
      </div>
    </div>
  );
};
