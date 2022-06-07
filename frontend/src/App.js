import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import SpotsPage from "./components/SpotsPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Footer from "./components/Footer";
import NewSpot from "./components/CreateSpot";
import SingleSpot from "./components/SpotPage";
import { getAllBookings } from "./store/bookings";
import { UserProfile } from "./components/UserProfile/UserProfile";
import { getSpots } from "./store/spots";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(getAllBookings())
    dispatch(getSpots())
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);


  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <LoginFormPage />
        </Route>
        <Route path="/signup">
          <SignupFormPage />
        </Route>
        <Route exact path="/spots">
          <SpotsPage />
        </Route>
        <Route exact path="/spots/host">
          <NewSpot />
        </Route>
        <Route exact path="/spots/:id">
          <SingleSpot />
        </Route>
        <Route exact path="/users/:userId">
          <UserProfile />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}

export default App;
