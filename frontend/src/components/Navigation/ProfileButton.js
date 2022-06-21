import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { FiUser, FiLogOut } from 'react-icons/fi';
import * as sessionActions from "../../store/session";

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
        <NavLink className="nav-user" to={`/users/${user?.id}`} exact={true} activeClassName='active'>
          <button className="icon">
            <i className="user-icon"><FiUser/></i>
          </button>
        </NavLink>
      </div>
        <div className="nav-li">
          <button className="icon" onClick={logout}>
            <i className="user-icon"><FiLogOut/></i>
          </button>
        </div>
    </>
  );
}

export default ProfileButton;
