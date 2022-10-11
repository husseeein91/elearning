import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import AdminLogin from "../Admin/auth/AdminLogin";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Dashboard from "../Admin/Dashboard";

import Navbar from "../layouts/Navbar";
import Alert from "../layouts/Alert";
import NotFound from "../layouts/NotFound";
import PrivateRoute from "../routing/PrivateRoute";

const Routes = () => {
  return (
    <Fragment>
      <Navbar />
      <section className="container">
        <Alert />
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/admin/login" component={AdminLogin} />
          <PrivateRoute exact path="/admin/dashboard" component={Dashboard} />
          <Route component={NotFound} />
        </Switch>
      </section>
    </Fragment>
  );
};

export default Routes;
