import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteABooking } from "../../../store/bookings";

export const DeleteBooking = ({ booking }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session?.user);

  if (!user) {
    history.push(`/login`);
  }

  const handleDeleteBooking = () => async (e) => {
    e.preventDefault();
    await dispatch(deleteABooking(booking));
  };

  return (
    <div className="delete-booking-container">
      <button
        className="delete-booking-button"
        onClick={handleDeleteBooking(booking)}
      >
          Delete Booking
      </button>
    </div>
  );
};
