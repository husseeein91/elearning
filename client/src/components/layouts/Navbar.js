import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Navbar = ({ auth }) => {
  let isAdmin = false;
  if (auth.isAuthenticated) {
    if (auth.user.role === "Admin") {
      isAdmin = true;
    } else {
      isAdmin = false;
    }
  }
  const adminLinks = (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <Link to="/" className="brand-link">
        <span className="brand-text font-weight-light">E-Learning System</span>
      </Link>
      <div className="sidebar">
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="info">
            <Link to="#!" className="d-block">
              Admin
            </Link>
          </div>
        </div>

        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <li className="nav-item">
              <Link to="#!" className="nav-link">
                <i className="nav-icon fas fa-tachometer-alt"></i>
                <p>Dashboard</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="#!" className="nav-link">
                <i className="nav-icon fas fa-users"></i>
                <p>Moderators</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="#!" className="nav-link">
                <i className="nav-icon fas fa-book"></i>
                <p>Subjects</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="#!" className="nav-link">
                <i className="nav-icon fas fa-book"></i>
                <p>Sessions</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="#!" className="nav-link">
                <i className="nav-icon fas fa-book"></i>
                <p>Add-Balance</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="#!" className="nav-link">
                <i className="nav-icon fas fa-book"></i>
                <p>Face-Recognition</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="#!" className="nav-link">
                <i className="nav-icon fas fa-calendar"></i>
                <p>Balance Report</p>
              </Link>
            </li>

            <li className="nav-item has-treeview">
              <Link to="#!" className="nav-link">
                <i className="nav-icon fas fa-user"></i>
                <p>
                  Students
                  <i className="right fas fa-angle-left"></i>
                </p>
              </Link>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to="#!" className="nav-link">
                    <i className="nav-icon fas fa-circle"></i>
                    <p>All Students</p>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="#!" className="nav-link">
                    <i className="nav-icon fas fa-circle"></i>
                    <p>Registered By Website</p>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="#!" className="nav-link">
                    <i className="nav-icon fas fa-window-close"></i>
                    <p>Delete All Students</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="#!" className="nav-link">
                    <i className="nav-icon fas fa-skull"></i>
                    <p>BlackList</p>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="#!" className="nav-link">
                    <i className="nav-icon fas fa-trash"></i>
                    <p>banned</p>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link to="#!" className="nav-link">
                <i className="nav-icon fas fa-th"></i>
                <p>Mcqs</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="#!" className="nav-link">
                <i className="nav-icon fas fa-th"></i>
                <p>Essays</p>
              </Link>
            </li>

            <li className="nav-item has-treeview">
              <Link to="#!" className="nav-link">
                <i className="nav-icon fas fa-chart-pie"></i>
                <p>
                  Site Setting
                  <i className="right fas fa-angle-left"></i>
                </p>
              </Link>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to="#!" className="nav-link">
                    <i className="fa fa-sliders-h nav-icon"></i>
                    <p>Logo & Registration</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="#!" className="nav-link">
                    <i className="fa fa-table nav-icon "></i>
                    <p>Contact Us Responses</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="#!" className="nav-link">
                    <i className="fa fa-file-image nav-icon"></i>
                    <p>Slider</p>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
  const moderatorLinks = (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <Link to="/" className="brand-link">
        <span className="brand-text font-weight-light">E-Learning System</span>
      </Link>
      <div className="sidebar">
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="info">
            <Link to="#!" className="d-block">
              Admin
            </Link>
          </div>
        </div>

        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <li className="nav-item">
              <Link to="#!" className="nav-link">
                <i className="nav-icon fas fa-tachometer-alt"></i>
                <p>Dashboard</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="#!" className="nav-link">
                <i className="nav-icon fas fa-book"></i>
                <p>Subjects</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="#!" className="nav-link">
                <i className="nav-icon fas fa-book"></i>
                <p>Sessions</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="#!" className="nav-link">
                <i className="nav-icon fas fa-book"></i>
                <p>Add-Balance</p>
              </Link>
            </li>

            <li className="nav-item has-treeview">
              <Link to="#!" className="nav-link">
                <i className="nav-icon fas fa-user"></i>
                <p>
                  Students
                  <i className="right fas fa-angle-left"></i>
                </p>
              </Link>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to="#!" className="nav-link">
                    <i className="nav-icon fas fa-circle"></i>
                    <p>All Students</p>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="#!" className="nav-link">
                    <i className="nav-icon fas fa-circle"></i>
                    <p>Registered By Website</p>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="#!" className="nav-link">
                    <i className="nav-icon fas fa-skull"></i>
                    <p>BlackList</p>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="#!" className="nav-link">
                    <i className="nav-icon fas fa-trash"></i>
                    <p>banned</p>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link to="#!" className="nav-link">
                <i className="nav-icon fas fa-th"></i>
                <p>Mcqs</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="#!" className="nav-link">
                <i className="nav-icon fas fa-th"></i>
                <p>Essays</p>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );

  const guestLinks = (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <Link to="/" className="brand-link">
        <span className="brand-text font-weight-light">E-Learning System</span>
      </Link>
      <div className="sidebar">
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="info">
            <Link to="#!" className="d-block">
              Guest
            </Link>
          </div>
        </div>

        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                <i className="nav-icon fas fa-tachometer-alt"></i>
                <p>Login To Enjoy our Services</p>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
  return (
    <Fragment>
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link
              to="#!"
              className="nav-link"
              data-widget="pushmenu"
              role="button"
            >
              <i className="fas fa-bars"></i>
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            {!auth.isAuthenticated ? (
              <Link to="/login" className="nav-link">
                Login
              </Link>
            ) : (
              <Link to="/admin/logout" className="nav-link">
                Logout
              </Link>
            )}
          </li>
          <li className="nav-item">
            <Link
              to="!#"
              className="nav-link"
              data-widget="control-sidebar"
              data-slide="true"
              role="button"
            >
              <i className="fas fa-th-large"></i>
            </Link>
          </li>
        </ul>
      </nav>
      {auth.isAuthenticated
        ? isAdmin
          ? adminLinks
          : moderatorLinks
        : guestLinks}
    </Fragment>
  );
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(Navbar);
