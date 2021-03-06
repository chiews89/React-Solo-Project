import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SpotsPage from "./components/SpotsPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import SingleSpot from "./components/SpotPage";
import { getAllBookings } from "./store/bookings";
import { UserProfile } from "./components/UserProfile/UserProfile/UserProfile";
import { getSpots } from "./store/spots";
import { Footer } from "./components/Footer";
import { getReviews } from "./store/reviews";
import { getAllFavorites } from "./store/favorites";
import { UserFavorites } from "./components/UserProfile/UserFavorites/UserFavorites";
import { UserUpcoming } from "./components/UserProfile/UserUpcoming/UserUpcoming";
import { UserPast } from "./components/UserProfile/UserPast/UserPast";
import { getAllUsers } from "./store/users";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(getAllBookings())
    dispatch(getSpots())
    dispatch(getReviews())
    dispatch(getAllFavorites())
    dispatch(getAllUsers())
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);


  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/spots">
          <SpotsPage />
        </Route>
        <Route exact path="/spots/:id">
          <SingleSpot />
        </Route>
        <Route exact path="/users/:userId">
          <UserProfile />
        </Route>
        <Route exact path="/users/:userId/favorites">
          <UserFavorites />
        </Route>
        <Route exact path="/users/:userId/upcoming">
          <UserUpcoming />
        </Route>
        <Route exact path="/users/:userId/past">
          <UserPast />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}

export default App;
