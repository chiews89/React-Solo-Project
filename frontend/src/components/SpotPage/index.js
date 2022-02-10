import React from "react";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneSpot } from "../../store/spots";
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
          src={spot?.Images[0] ? spot?.Images[0].url : ""}
        />
      </div>
      <div className="spot-info">
        <p>{spot?.description}</p>
        <div>
          Location: {spot?.city}, {spot?.state}
        </div>
        <div>Price: ${Math.round(spot?.price)} / Day</div>
      </div>
    </div>
  );
};

export default SingleSpot;
