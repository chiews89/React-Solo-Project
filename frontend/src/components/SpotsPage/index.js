import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./spotsPage.css";

const AllSpots = () => {
  const spots = useSelector((state) => {
    return state.spots;
  });
  const spotsObj = Object.values(spots);

  return (
    <div className="all-spots">
      <div className="spots-container">
        {spotsObj.map((spot) => (
          <div key={spot?.id}>
            <div className="spots-image-container">
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
            </div>
            <div className="spots-location">
              <h4>
                {spot?.city}, {spot?.state}
              </h4>
            </div>
            <div className="spots-price">
              <h3>
                ${Math.round(spot.price)}
                <span>/ night</span>
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllSpots;
