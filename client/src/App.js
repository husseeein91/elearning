import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import { Landing } from "./components/layouts/Landing";
import { Register } from "./components/auth/Register";
import AdminLogin from "./components/Admin/auth/AdminLogin";
import Dashboard from "./components/Admin/Dashboard";
import Alert from "./components/layouts/Alert";

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          {/* <h1>Hello React</h1> */}
          <Route exact path="/" component={Landing} />
          <div className="content-wrapper">
            <div className="content-header">
              <div className="container-fluid">
                <div className="row mb-2"></div>
              </div>
            </div>
            <section className="content">
              <Alert />
              <Switch>
                <Route exact path="/admin/dashboard" component={Dashboard} />
                <Route exact path="/admin/login" component={AdminLogin} />
                <Route exact path="/admin" component={Landing} />
                <Route exact path="/register" component={Register} />
              </Switch>
            </section>
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
