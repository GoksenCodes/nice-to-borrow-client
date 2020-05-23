import React, { useEffect } from "react";
import "./App.css";

import { Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Loading from "./components/Loading";
import MessageBox from "./components/MessageBox";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import BookDetails from "./pages/BookDetails";
import AddABook from "./pages/AddABook";

import { useDispatch, useSelector } from "react-redux";
import { selectAppLoading } from "./store/appState/selectors";
import { getUserWithStoredToken } from "./store/user/actions";
import { Container } from "react-bootstrap";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <div className="App">
      <Navigation />
      <Container className="pt-5">
        <MessageBox />
        {isLoading ? <Loading /> : null}
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/addbook" component={AddABook} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route exact path="/:id" component={BookDetails} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
