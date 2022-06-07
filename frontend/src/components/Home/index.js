import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import './home.css'

function Home() {

    const user = useSelector((state) => state?.session?.user)

    console.log('user', user)

    return (
        <div className="main_container">
            <div className="first_photo_container">
                <img id="luxury-rental" src="https://media.architecturaldigest.com/photos/576d98445ea3e586576ec49a/16:9/w_2580,c_limit/luxury-vacation-rental-sites-03.jpg" alt="luxury-house"></img>
                    <div className="find-spot-container">
                        <NavLink to="/spots">
                            <button className="find-spot">Find A Spot To Stay Tonight!</button>
                        </NavLink>
                    </div>
            </div>
            <div className="second_photo_container">
                <img id="cabin-house" src="https://www.southerncomfortcabinrentals.com/custimages/page-images/category-images/cabin-rentals-luxury.jpg" alt="cabin-house"></img>
            </div>
        </div>
    )
}

export default Home
