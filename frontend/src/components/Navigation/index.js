import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import "./demoUser";
import DemoUser from "./demoUser";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className="nav-bar">
        <NavLink exact to="/">
          Home
        </NavLink>
        <NavLink exact to="/spots">
          Find A Spot
        </NavLink>
        <div className="profile-button">
        <NavLink exact to="/spots/host">
          Host A Spot
        </NavLink>
          <ProfileButton user={sessionUser} />
        </div>
      </div>
    );
  } else {
    sessionLinks = (
      <div className="nav-bar">
        <div className="login-signup">
          <NavLink to="/login">Log In</NavLink>
          <NavLink to="/signup">Sign Up</NavLink>
          <NavLink to="/spots">Find A Spot</NavLink>
          <DemoUser> Demo </DemoUser>
        </div>
      </div>
    );
  }
  return <>{isLoaded && sessionLinks}</>;
}
export default Navigation;
