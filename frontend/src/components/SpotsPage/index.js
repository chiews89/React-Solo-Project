import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSpots } from "../../store/spots";

const AllSpots = () => {
  const dispatch = useDispatch();
  const spotsObj = useSelector((state) => state.spotState.spots);
  const spots = Object.values(spotsObj.spots);
  console.log(spots);

  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);

  return <></>;
};

export default AllSpots;
