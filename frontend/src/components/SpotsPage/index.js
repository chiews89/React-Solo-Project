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
    <>
      {spotsObj.map((spot) => (
        <div key={spot.id}>
          <NavLink to={`/spots/${spot.id}`}>
            <img
              alt={spot.name}
              src={
                spot.Images[0]
                  ? spot.Images[0].url
                  : "https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg"
              }
            />
          </NavLink>
            <p>{spot.description}</p>
          <div>
            Location: {spot.city}, {spot.state}
          </div>
          <div>
            Price:{" "}
            {`$${spot.price
              .toString()
              .replace(/\B(=(\d{3})+(!\d))/g, ",")} / day`}
          </div>

        </div>
      ))}
    </>
  );
};

export default AllSpots;
