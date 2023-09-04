import React, { useState } from "react";
import "./navbar.css";
import logo from "../../media/logo.png";
import profileIcon from "../../media/profile.jpg";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaFilter,
  FaDiscord,
  FaRedditAlien,
  FaBars,
  FaTelegramPlane,
  FaBell,
  FaTwitter,
} from "react-icons/fa";

import Actions from "./Actions";

export default function NavBar(props) {
  const [searchForm, setSearchForm] = useState({});

  const setSidebarIsOpen = props.setSidebarIsOpen;
  const pageIsScrolled = props.isScrolled;
  function handleSearchForm(event) {
    const { name, value } = event.target;
    setSearchForm((prev) => ({ ...prev, [name]: value }));
  }
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
          onChange={(e) => handleSearchForm(e)}
        />
        <FaSearch className="search-icon search-icons" size={20} color="grey" />
        <FaFilter className="filter-icon search-icons" size={20} color="grey" />
      </div>
      <div className="social-links-wrapper">
        <span
          style={{ backgroundColor: "#6f85d5" }}
          className="d-flex a-center j-center"
        >
          <a
            href="https://discord.com/invite/RRaf5JkkKu"
            target="_blank"
            rel="noreferrer"
          >
            <FaDiscord size={22} />
          </a>
        </span>
        <span
          style={{ backgroundColor: "#ff3c1f" }}
          className="d-flex a-center j-center"
        >
          <a
            href="https://www.reddit.com/r/AniWatchZone/"
            target="_blank"
            rel="noreferrer"
          >
            <FaRedditAlien size={22} />
          </a>
        </span>
        <span
          style={{ backgroundColor: "#08c" }}
          className="d-flex a-center j-center"
        >
          <a
            href="https://t.me/+6pPzElOP7rc4ZGI1"
            target="_blank"
            rel="noreferrer"
          >
            <FaTelegramPlane size={22} />
          </a>
        </span>
        <span
          style={{ backgroundColor: "#1d9bf0" }}
          className="d-flex a-center j-center"
        >
          <a
            href="https://twitter.com/AniWatchGo"
            target="_blank"
            rel="noreferrer"
          >
            <FaTwitter size={22} />
          </a>
        </span>
      </div>
      <Actions isInSidebar={false} />
      <div className="user-profile-nots a-center j-center d-flex trans-c-03">
        <FaBell size={20} />
        <img className="profile-icon" src={profileIcon} alt="profile-icon" />
      </div>
    </nav>
  );
}
