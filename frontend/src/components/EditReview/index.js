import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { updateReview } from "../../store/reviews";

const EditSpot = ({ review, hideForm }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const [rating, setRating] = useState({ review, hideForm }?.rating);
  const [review, setReview] = useState(review?.review);
  const [errorValidator, setErrorValidator] = useState([]);

  useEffect(() => {
    const errors = [];

    if (!rating?.length) errors.push("Please provide a rating");
    if (!review?.length) errors.push("Please provide a review");
    setErrorValidator(errors);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      userId: user.id,
      rating,
      review,
    };
    const updatedReview = await dispatch(updateReview(payload));
    if (updatedReview) {
      if (updatedReview) hideForm();
    }
  };

  return (
      <>
      </>
  )
};
