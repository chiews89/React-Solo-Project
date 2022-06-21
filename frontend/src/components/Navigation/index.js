import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import "./demoUser";
import DemoUser from "./demoUser";
import { FcHome } from 'react-icons/fc'
import { LoginFormModal } from "../LoginFormPage";
import { SignupFormModal } from "../SignupFormPage";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <SignupFormModal />
        <DemoUser />
      </>
    );
  }

  return (
    <nav className="nav-bar">
      <div className="left-container">
        <NavLink exact to="/">
          <h3 className="home-logo"><FcHome className="home-icon"/> {' '} HomeBnB</h3>
        </NavLink>
      </div>
      <div className="right-container">
        <ul className="nav-right-ul">{isLoaded && sessionLinks}</ul>
      </div>
    </nav>
  );
}
export default Navigation;
