import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { MdLogout } from "react-icons/md";
import * as sessionActions from "../../store/session";
import { CreateSpotModal } from "../CreateSpot";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <div className="nav-li">
        <CreateSpotModal className="icon"/>

      </div>
      <div className="nav-li">
        <NavLink
          className="nav-user"
          to={`/users/${user?.id}`}
          exact={true}
          activeClassName="active"
        >
          <button className="icon">
            <i className="user-icon">
              <CgProfile />
            </i>
          </button>
        </NavLink>
      </div>
      <div className="nav-li">
        <button className="icon" onClick={logout}>
          <i className="user-icon">
            <MdLogout />
          </i>
        </button>
      </div>
    </>
  );
}

export default ProfileButton;
