import React from "react";
import { Link } from "react-router-dom";
import "../Style/navigation.css";
import { Routes, Route, NavLink } from "react-router-dom";
import Bannerpage from "./Bannerpage";
import Listing from "./Listing";
import Editpage from "./Editpage";
import Subscription from "./Subscription";
import SubscriptionPageListing from "./SubscriptionPageListing";
import SubscriptionEdit from "./SubscriptionEdit";
import Testimonials from "./Testimonials";
import TestimonialsListing from "./TestimonialsListing";
import TestimonialsEdit from "./TestimonialsEdit";
import ShowSubscription from "./ShowSubscription";

const Navigation = () => {
  const myFunction = (e) => {
    document.getElementById("navbar").style.width = "250px";
  };
  const closeNav = () => {
    document.getElementById("navbar").style.width = "0px";
  };
  return (
    <div>
      <div className="main-navigation">
        <div id="navbar" className="navigation">
          <p onClick={closeNav} id="closeNavbar" className="closenav">
            X
          </p>
          <ul>
            <li>
              <NavLink
                className={"list"}
                exact
                activeClassName={"active"}
                to="/"
              >
                Banner_Page
              </NavLink>
            </li>
            <li>
              <NavLink
                className={"list"}
                activeClassName={"active"}
                to="/listing"
              >
                Listing
              </NavLink>
            </li>
            <li>
              <NavLink
                className={"list"}
                activeClassName={"active"}
                to={"/subscription"}
              >
                Subscription
              </NavLink>
            </li>
            <li>
              <NavLink
                className={"list"}
                activeClassName={"active"}
                to={"/subscriptionlisting"}
              >
                Subscription Listing
              </NavLink>
            </li>
            <li>
              <NavLink
                className={"list"}
                activeClassName={"active"}
                to={"/testimonials"}
              >
                Testimonials
              </NavLink>
            </li>
            <li>
              <NavLink
                className={"list"}
                activeClassName={"active"}
                to={"/testimonialslisting"}
              >
                Testimonials_Listing
              </NavLink>
            </li>
            <li>
              <NavLink
                className={"list"}
                activeClassName={"active"}
                to={"/showSubscrption"}
              >
                Show _Subscription
              </NavLink>
            </li>
          </ul>
        </div>
        <div id="navopenMenu" onClick={myFunction}>
          <div>
            <div className="menu"></div>
            <div className="menu"></div>
            <div className="menu"></div>
          </div>
          <span className="menutext">Menu</span>
        </div>

        <Routes>
          <Route path="/" element={<Bannerpage />} />
          <Route path="/listing" element={<Listing />} />
          <Route path="/listing/editdata/:id" element={<Editpage />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route
            path="/subscriptionlisting"
            element={<SubscriptionPageListing />}
          />
          <Route
            path="/subscriptionlisting/editdata/:id"
            element={<SubscriptionEdit />}
          />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route
            path="/testimonialslisting"
            element={<TestimonialsListing />}
          />
          <Route
            path="/testimonialslisting/editTestimonials/:id"
            element={<TestimonialsEdit />}
          />
          <Route path="/showSubscrption" element={<ShowSubscription />} />
        </Routes>
      </div>
    </div>
  );
};

export default Navigation;
