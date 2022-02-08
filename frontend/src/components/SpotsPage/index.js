import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpots } from "../../store/spots";

const AllSpots = () => {
  const dispatch = useDispatch();

  const spots = useSelector((state) => {
    return Object.values(state.spots);
  });

  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);

  return (
  <>
  <div>
    
  </div>
  </>);
};

export default AllSpots;
