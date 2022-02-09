import React from "react";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneSpot } from "../../store/spots";
import NewSpot from "../CreateSpot";
import { useState } from "react";
const SingleSpot = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const spot = useSelector((state) => state.spots[id]);

  useEffect(() => {
    dispatch(getOneSpot(id));
  }, [dispatch, id]);


  const [showCreate, setShowCreate] = useState(true);

  const hideForm = () => {
    setShowCreate(true);
  };

  return (
    <div>
      <span className="host-spot-btn-container">
        <div className={`host-spot-main-container ${showCreate}`}>
          <NewSpot hideForm={hideForm} className="host-spot-ele" />
        </div>
      </span>
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
