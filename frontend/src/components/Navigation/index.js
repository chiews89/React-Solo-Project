import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import "./demoUser";
import DemoUser from "./demoUser";
import { CreateSpotModal } from "../CreateSpot";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className="nav-bar">
        <div className="home-logo">
          <NavLink exact to="/">
            HomeBnB
          </NavLink>
        </div>
        <NavLink exact to="/spots">
          Find A Spot
        </NavLink>
        <CreateSpotModal />
        <div className="profile-button">
          <ProfileButton user={sessionUser} />
        </div>
      </div>
    );
  } else {
    sessionLinks = (
      <div className="nav-bar">
        <div className="home-logo">
          <NavLink exact to="/">
            HomeBnB
          </NavLink>
        </div>
        <NavLink to="/signup">Sign Up</NavLink>
        <NavLink to="/spots">Find A Spot</NavLink>
        <div className="profile-button">
          <DemoUser> Demo </DemoUser>
        </div>
      </div>
    );
  }
  return <>{isLoaded && sessionLinks}</>;
}
export default Navigation;
