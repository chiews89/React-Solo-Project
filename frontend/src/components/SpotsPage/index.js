import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./spotsPage.css";
import { useEffect } from "react";

const AllSpots = () => {
  const spots = useSelector((state) => {
    return state.spots;
  });
  const spotsObj = Object.values(spots);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="all-spots-container">
      {spotsObj.map((spot) => (
        <div className="spot-container" key={spot?.id}>
          <NavLink to={`/spots/${spot?.id}`}>
            <img
              className="spots-image"
              alt={spot?.name}
              src={
                spot?.Images[0]
                  ? spot?.Images[0].url
                  : "https://media.istockphoto.com/vectors/no-image-available-sign-vector-id922962354?k=20&m=922962354&s=612x612&w=0&h=f-9tPXlFXtz9vg_-WonCXKCdBuPUevOBkp3DQ-i0xqo="
              }
            />
          </NavLink>
          <div className="spot-info-container">
            <div className="spot-title">
              <h3>{spot.title}</h3>
            </div>
            <div className="spot-info">
              <div className="spot-guests">
                <h5>Guests: {spot.guests}</h5>
              </div>
              <div className="spot-bedrooms">
                <h5>Bedrooms: {spot.bedrooms}</h5>
              </div>
              <div className="spot-bathrooms">
                <h5>Bathrooms: {spot.bathrooms}</h5>
              </div>
            </div>
            <div className="spot-price">
            <div className="spot-location">
              <h5>
                {spot?.city}, {spot?.state}
              </h5>
            </div>
              <h4>
                ${Math.round(spot.price)}
                <span>/ night</span>
              </h4>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllSpots;
