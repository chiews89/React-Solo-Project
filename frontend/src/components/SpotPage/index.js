import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getOne, getOneSpot } from "../../store/spots";

const SingleSpot = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const spot = useSelector((state) => state.spots[id]);

  useEffect(() => {
    dispatch(getOneSpot(id));
  }, [dispatch, id]);

  return (
    <div>
      <div className="spot-image">
        <img
          alt={spot?.name}
          src={
            spot?.Images[0]
              ? spot?.Images[0].url
              : "https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg"
          }
        />
      </div>
      <div className="spot-info">
        <p>{spot?.description}</p>
        <div>
          Location: {spot?.city}, {spot?.state}
        </div>
        <div>
          Price:{" "}
          {`$${spot?.price
            .toString()
            .replace(/\B(=(\d{3})+(!\d))/g, ",")} / day`}
        </div>
      </div>
    </div>
  );
};

export default SingleSpot;
