import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import moment from "react-moment";
import { DeleteBooking } from "../../Booking/DeleteBooking/DeleteBooking";

export const UserUpcoming = () => {
  const user = useSelector((state) => state?.session?.user);
  const bookings = Object.values(useSelector((state) => state?.bookings)).reverse();
  const userBookings = bookings.filter((booking) => {
    return booking.userId === user?.id;
  });
  const upcomingBookings = userBookings.filter(
    (upcoming) => moment(upcoming.checkIn) > moment()
  );

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
          <h2>Your Upcoming Trips</h2>
        </div>
      </div>
      {!upcomingBookings.length && (
        <div className="no-bookings">
          <h4>No upcoming trips</h4>
          <NavLink to={`/spots`}>Find your next trip</NavLink>
        </div>
      )}
      <div className="user-listings-container">
        {upcomingBookings.map((booking) => (
          <div className="profile-user-spots" key={booking?.id}>
            <div className="profile-spot-title">
              <h4>{booking.Spot?.title}</h4>
            </div>
            <div className="profile-spot-image-container">
              <NavLink to={`/spots/${booking.Spot?.id}`}>
                <img
                  className="profile-spot-image"
                  onError={noImage}
                  alt={booking.Spot?.id}
                  src={booking.Spot?.Images[0].url}
                />
              </NavLink>
            </div>
            <div className="profile-booking-dates">
                                    <div>
                                        <span>Check In {moment(booking.checkIn).add('days', 1).format('MMMM D YYYY')}</span>
                                    </div>
                                    <div>
                                        <span>Check Out {moment(booking.checkOut).add('days', 1).format('MMMM D YYYY')}</span>
                                    </div>
                                </div>
            <div className="profile-spot-address">

              <span className="profile-spot-address-info">{booking?.Spot?.address}
              <span> <DeleteBooking booking={booking.id} /></span>
              </span>
              <span className="profile-spot-address-info">{booking?.Spot?.city}</span>
              <span className="profile-spot-address-info">{booking?.Spot?.state}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
