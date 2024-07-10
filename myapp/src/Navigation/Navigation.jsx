import React from "react";
import "../Style/navStyle/navigation.css";
import { Routes, Route, NavLink } from "react-router-dom";
import Bannerpage from "../Components/BannerPage/Bannerpage";
import Listing from "../Components/BannerPage/Listing";
import Editpage from "../Components/BannerPage/Editpage";
import Subscription from "../Components/SubscriptionPage/Subscription";
import SubscriptionPageListing from "../Components/SubscriptionPage/SubscriptionPageListing";
import SubscriptionEdit from "../Components/SubscriptionPage/SubscriptionEdit";
import Testimonials from "../Components/Testimonials/Testimonials";
import TestimonialsListing from "../Components/Testimonials/TestimonialsListing";
import TestimonialsEdit from "../Components/Testimonials/TestimonialsEdit";
import ShowSubscription from "../Components/SubscriptionPage/ShowSubscription";

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
              <NavLink className={"list"} activeclassname={"active"} to="/">
                Banner_Page
              </NavLink>
            </li>
            <li>
              <NavLink
                className={"list"}
                activeclassname={"active"}
                to="/listing"
              >
                Listing
              </NavLink>
            </li>
            <li>
              <NavLink
                className={"list"}
                activeclassname={"active"}
                to={"/subscription"}
              >
                Subscription
              </NavLink>
            </li>
            <li>
              <NavLink
                className={"list"}
                activeclassname={"active"}
                to={"/subscriptionlisting"}
              >
                Subscription Listing
              </NavLink>
            </li>
            <li>
              <NavLink
                className={"list"}
                activeclassname={"active"}
                to={"/testimonials"}
              >
                Testimonials
              </NavLink>
            </li>
            <li>
              <NavLink
                className={"list"}
                activeclassname={"active"}
                to={"/testimonialslisting"}
              >
                Testimonials_Listing
              </NavLink>
            </li>
            <li>
              <NavLink
                className={"list"}
                activeclassname={"active"}
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
