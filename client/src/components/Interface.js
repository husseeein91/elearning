import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Interface = () => {
  return (
    <Fragment>
      <div id="wrapper" className="clearfix">
        <div
          id="home"
          className="page-section"
          //   style="position:absolute;top:0;left:0;width:100%;height:200px;z-index:-2;"
        ></div>

        <section
          id="slider"
          className="slider-element slider-parallax full-screen with-header swiper_wrapper clearfix"
        >
          <div className="slider-parallax-inner">
            <div className="swiper-container swiper-parent">
              <div className="swiper-wrapper">
                <div
                  className="swiper-slide dark"
                  //   style="background-image: url('{{url('/uploads', $value->image)}}');"
                >
                  <div className="container clearfix">
                    <div className="slider-caption slider-caption-center"></div>
                  </div>
                </div>
              </div>
              <div className="slider-arrow-left">
                <i className="icon-angle-left"></i>
              </div>
              <div className="slider-arrow-right">
                <i className="icon-angle-right"></i>
              </div>
              <div className="slide-number">
                <div className="slide-number-current"></div>
                <span>/</span>
                <div className="slide-number-total"></div>
              </div>
            </div>
          </div>
        </section>
        <header id="header" className="full-header">
          <div id="header-wrap">
            <div className="container clearfix">
              <div id="primary-menu-trigger">
                <i className="icon-reorder"></i>
              </div>
              <div id="logo">
                <Link
                  to="https://mathacademi.com/"
                  className="standard-logo"
                  data-dark-logo="images/logo-dark.png"
                >
                  <img
                    src="{{url('/uploads', $logo->logo)}}"
                    alt="Canvas Logo"
                  />
                </Link>
                <Link
                  to="https://mathacademi.com/"
                  className="retina-logo"
                  data-dark-logo="images/logo-dark@2x.png"
                >
                  <img
                    src="{{url('/')}}/design/interface/images/logo
                                        @2x.png"
                    alt="MathAcademi Logo"
                  />
                </Link>
              </div>
              <nav id="primary-menu">
                <ul
                  className="one-page-menu"
                  data-easing="easeInOutExpo"
                  data-speed="1500"
                >
                  <li>
                    <Link to="#" data-to="#home">
                      <div>Home</div>
                    </Link>
                  </li>
                  <li>
                    <Link to="#" data-toggle="modal" data-target="#student">
                      <div>Registration</div>
                    </Link>
                  </li>
                  <li>
                    <Link to="{{ url('student/login') }}">
                      <div>Login</div>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#contact"
                      data-toggle="modal"
                      data-target="#contact"
                    >
                      <div>Contact Us</div>
                    </Link>
                  </li>
                  <li>
                    <Link to="#" data-toggle="modal" data-target="#call">
                      <div>Call Us</div>
                    </Link>
                  </li>
                  <li>
                    <Link to="#" data-to="#section-team">
                      <div>Team</div>
                    </Link>
                  </li>
                  <li>
                    <Link to="#" data-to="#section-reg">
                      <div>How To Register</div>
                    </Link>
                  </li>
                </ul>

                <button
                  type="button"
                  className="btn btn-primary"
                  data-toggle="modal"
                  data-target="#student"
                >
                  Register Now From Here
                </button>
              </nav>
            </div>
          </div>
        </header>
      </div>
    </Fragment>
  );
};

export default Interface;
