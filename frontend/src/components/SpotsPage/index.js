import { useEffect } from "react";
import { NavLink } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getSpots } from "../../store/spots";
const AllSpots = () => {
  const dispatch = useDispatch();

  const spots = useSelector((state) => {
    return state.spots;
  });
  const spotsObj = Object.values(spots);

  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);



  return (
    <div>

      {spotsObj.map((spot) => (
        <div key={spot?.id}>
          <NavLink to={`/spots/${spot?.id}`}>
            <img
              alt={spot?.name}
              src={spot?.Images[0] ? spot?.Images[0].url : "https://media.istockphoto.com/vectors/no-image-available-sign-vector-id922962354?k=20&m=922962354&s=612x612&w=0&h=f-9tPXlFXtz9vg_-WonCXKCdBuPUevOBkp3DQ-i0xqo="}
            />
          </NavLink>
          <p>{spot?.description}</p>
          <div>
            Location: {spot?.city}, {spot?.state}
          </div>
          <div>${Math.round(spot.price)} / Day</div>
        </div>
      ))}
    </div>
  );
};

export default AllSpots;
