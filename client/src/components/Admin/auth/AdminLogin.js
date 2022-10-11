import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../../actions/auth";
import { Redirect } from "react-router-dom";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: "off",
  });

  const { email, password, rememberMe } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  //Redirect if Logged in

  if (isAuthenticated) {
    return <Redirect to="/admin/dashboard" />;
  }
  return (
    <Fragment>
      <section className="content">
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="input-group mb-3">
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
              className="form-control"
              placeholder="Email"
            />
            <div className="input-group-append">
              <div className="input-group-text">
                <span className="fas fa-envelope"></span>
              </div>
            </div>
          </div>
          <div className="input-group mb-3">
            <input
              id="pass"
              type="password"
              name="password"
              value={password}
              onChange={(e) => onChange(e)}
              className="form-control"
              placeholder="Password"
            />
            <div className="input-group-append">
              <div className="input-group-text">
                <span id="pass_check" className="fas fa-lock"></span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-8">
              <div className="icheck-primary">
                <input
                  name="rememberMe"
                  type="checkbox"
                  value={rememberMe}
                  onChange={(e) => onChange(e)}
                  id="remember"
                />
                <span>Remember Me</span>
              </div>
            </div>
            <div className="col-4">
              <button type="submit" className="btn btn-primary btn-block">
                Sign In
              </button>
            </div>
          </div>
        </form>
      </section>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
