import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./LoginForm.css";
import DemoUser from "../Navigation/demoUser";

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <div className="login-form-container">
      <h3 className="login-title"> Sign In</h3>
      <form className="login-form" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li className="login-errors" key={idx}>
              {error}
            </li>
          ))}
        </ul>
        <div className="login-label-container">
          <label className="login-label">
            Username or Email
            <input
              className="login-input"
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
            />
          </label>
          <label className="login-label">
            Password
            <input
              className="login-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <div className="login-submit">
          <button className="login-submit-button" type="submit">
            Log In
          </button>
        </div>
        <div className="login-demo-user">
          <DemoUser />
        </div>
      </form>
    </div>
  );
}

export default LoginFormPage;
