import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
// import {useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'
// import { getReviews } from '../../store/reviews';
;


function Reviews({review, spotId}) {
    // const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user)
    const [sessionId, setSessionId] = useState()
    // const [reviews, setReviews] = useState("")
    const [formData, setFormData] = useState({ reviews: "" })
    // const [errors, setErrors] = useState([])

    // const dispatch = useDispatch();

    const user = useSelector((state) => state.session.user);
    useEffect(() => {
        if (sessionUser) {
            setSessionId(sessionUser.id)
        }
    }, [sessionUser])

    // const reviews = useSelector((state) => {
    //     return state.reviews;
    // })
    // const reviewsObj = Object.values(reviews)
    // useEffect(() => {
    //     dispatch(getReviews());
    //   }, [dispatch]);


    const handleReview = (e) => {
        // e.preventDefault();

        // const create = {spotId, userId: sessionId, reviews}
        // return dispatch(createReview(create))

        //Geoff's solution
        setFormData({formData, [e.target.name]: e.target.value})
    }


    if (!user || !user.id) return null;
    return (
        <div className="reviews_main_container">
            <div className="all_reviews_container">

                <h3>Submit a review</h3>
                <form>
                    <input
                     name="content"
                     type='text'
                     value={review}
                     onChange={handleReview}
                     />
                </form>
                <button className='review-submit' type="submit">
                    Submit
                </button>
            </div>


        </div>
    )

}

export default Reviews;
