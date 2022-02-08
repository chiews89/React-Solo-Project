import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSpots } from "../../store/spots";

const AllSpots = () => {
  const dispatch = useDispatch();

  const spots = useSelector(state => {
    return Object.values(state.spots)
  })
  console.log('all spots', spots)
  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);

  return <></>;
};

export default AllSpots;
