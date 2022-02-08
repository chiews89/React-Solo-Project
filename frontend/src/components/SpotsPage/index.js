import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpots } from "../../store/spots";

const AllSpots = () => {
  const dispatch = useDispatch();

  const spots = useSelector(state => {
    return Object.values(state.spotState.spots)
  })
  console.log(spots)


  useEffect(() => {
    dispatch(getSpots());
  },[dispatch]);

  return (
  <>
  </>);
};

export default AllSpots;
