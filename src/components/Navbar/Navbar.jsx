import React, { useState } from "react";
import "./navbar.css";
import logo from "../../media/logo.png";
import profileIcon from "../../media/profile.jpg";
import { Link, Navigate, redirect } from "react-router-dom";
import { FaSearch, FaBars, FaBell } from "react-icons/fa";

import Actions from "./Actions";
import SocialLinks from "./SocialLinks";

export default function NavBar(props) {
  const [searchForm, setSearchForm] = useState({ name: "" });

  const setSidebarIsOpen = props.setSidebarIsOpen;
  const pageIsScrolled = props.isScrolled;
  function handleSearchForm(event) {
    const { name, value } = event.target;
    setSearchForm((prev) => ({ ...prev, [name]: value }));
  }
  const handleKeyPress = (event) => {};
  return (
    <nav
      className={`navigation-bar a-center d-flex ${
        pageIsScrolled ? "dark" : "transparent"
      }`}
    >
      <div className="menu-group a-center d-flex">
        <FaBars
          size={20}
          className="burger-icon trans-05"
          onClick={() => setSidebarIsOpen(true)}
        />
        <div className="logo-wrapper a-center d-flex">
          <Link to="/">
            <img src={logo} className="logo" alt="logo" />
          </Link>
        </div>
      </div>
      <div className="search-wrapper">
        <input
          type="text"
          className="search-text f-poppins"
          placeholder="Search anime..."
          name="name"
          value={searchForm?.name}
          onChange={(e) => handleSearchForm(e)}
          onKeyDown={(e) => handleKeyPress(e)}
        />
        <Link to={`/search?name=${searchForm?.name}&parameter=title`}>
          <FaSearch
            onClick={() => setSearchForm({ name: "" })}
            className="search-icon search-icons"
            size={20}
            color="grey"
          />
        </Link>

        {/* <FaFilter className="filter-icon search-icons" size={20} color="grey" /> */}
      </div>
      <SocialLinks />
      <Actions isInSidebar={false} />
      <div className="user-profile-nots a-center j-center d-flex trans-c-03">
        <FaBell size={20} />
        <img className="profile-icon" src={profileIcon} alt="profile-icon" />
      </div>
    </nav>
  );
}
