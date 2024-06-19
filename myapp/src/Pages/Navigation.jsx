import React from "react";
import { Link } from "react-router-dom";
import "../Style/navigation.css";
import { Routes, Route } from "react-router-dom";
import Bannerpage from "./Bannerpage";
import Listing from "./Listing";
import Editpage from "./Editpage";

const Navigation = () => {
  return (
    <div>
      <div className="navigation">
        <ul>
          <li>
            <Link className="list" to={"/"}>
              Banner_Page
            </Link>
          </li>
          <li>
            <Link className="list" to={"/listing"}>
              Listing
            </Link>
          </li>
        </ul>
      </div>
      <Routes>
      <Route path="/" element={<Bannerpage />} />
      <Route path="/listing" element={<Listing />} />
      <Route path="/listing/editdata/:id" element={<Editpage/>}/>
    </Routes>
  
    </div>
  );
};

export default Navigation;
