import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import NewSpot from "../CreateSpot";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const [showcreate, setShowcreate] = useState(false)

  const hideForm = () => {

  }

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
    <div>
            <NavLink exact to="/">
        Home
      </NavLink>
      <NavLink exact to="/spots">
        Find A Spot
      </NavLink>
    </div>
  } else {
    sessionLinks = (
      <div className="login-signup">
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
        <NavLink to='/spots'>Find A Spot</NavLink>
      </div>
    );
  }

  return (
    <>
      <NavLink exact to="/">
        Home
      </NavLink>
      <NavLink exact to="/spots">
        Find A Spot
      </NavLink>
      <div>
        <div className="create-spot-div">
          <NewSpot />
        </div>
      </div>
      <div className="profile-button">
      </div>
      {isLoaded && sessionLinks}
    </>
  );
}
export default Navigation;
