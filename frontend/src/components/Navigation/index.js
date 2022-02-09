import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div>
        <ProfileButton user={sessionUser} />
        <NavLink exact to="/">
          Home
        </NavLink>
        <NavLink exact to="/spots">Find A Spot</NavLink>
        <NavLink to="/spots/host">Host A Spot</NavLink>
        <div className="profile-button"></div>
      </div>
    );
  } else {
    sessionLinks = (
      <div className="login-signup">
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
        <NavLink to="/spots">Find A Spot</NavLink>
      </div>
    );
  }
  return <>{isLoaded && sessionLinks}</>;
}
export default Navigation;
