import React from "react";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getOneSpot } from "../../store/spots";
import  UpdateSpot from '../EditSpot/index'

const SingleSpot = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const { id } = useParams();
  const spot = useSelector((state) => state.spots[id]);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    dispatch(getOneSpot(id));
  }, [dispatch, id]);



  if (!spot) {
    return null;
  }

  return (
    <div>
      <div className="spot-image">
        <img
          alt={spot?.name}
          src={
            spot?.Images[0]
              ? spot?.Images[0].url
              : "https://media.istockphoto.com/vectors/no-image-available-sign-vector-id922962354?k=20&m=922962354&s=612x612&w=0&h=f-9tPXlFXtz9vg_-WonCXKCdBuPUevOBkp3DQ-i0xqo="
          }
        />
      </div>
      <div className="spot-info">
        <p>{spot?.description}</p>
        <div>
          Location: {spot?.city}, {spot?.state}
        </div>
        <div>Price: ${Math.round(spot?.price)} / Day</div>
      </div>
      <div>

      <div>
      </div>
        <UpdateSpot spot={spot} hideForm={() => setShowEdit(false)} />
      </div>
    </div>
  );
};

export default SingleSpot;
