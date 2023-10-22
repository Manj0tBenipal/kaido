import React, { useState, useEffect } from "react";
import "./navbar.css";
import logo from "../../media/logo.png";
import { Link } from "react-router-dom";
import { FaSearch, FaBars, FaBell } from "react-icons/fa";

import Actions from "./Actions";
import SocialLinks from "./SocialLinks";

export default function NavBar(props) {
  const [searchForm, setSearchForm] = useState({ name: "" });
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [floatSearchIsVisible, setFloatSearchIsVisible] = useState(false);
  const setSidebarIsOpen = props.setSidebarIsOpen;
  const pageIsScrolled = props.isScrolled;
  function handleSearchForm(event) {
    const { name, value } = event.target;
    setSearchForm((prev) => ({ ...prev, [name]: value }));
  }
  const handleKeyPress = (event) => {};
  useEffect(() => {
    function handleChange() {
      setScreenWidth(window.innerWidth);
    }
    const listener = window.addEventListener("resize", handleChange);
    return () => window.removeEventListener(listener, handleChange);
  }, []);
  return (
    <>
      <nav
        className={`navigation-bar a-center d-flex ${
          pageIsScrolled ? "dark" : "transparent"
        } trans-03`}
      >
        <div className="menu-group a-center d-flex">
          <FaBars
            size={20}
            className="burger-icon trans-05"
            onClick={() => setSidebarIsOpen(true)}
          />
          <div className="logo-wrapper a-center d-flex">
            <Link to="/">
              <img
                src={logo}
                className="logo"
                alt="logo"
                onClick={() => scrollTo({ top: 0 })}
              />
            </Link>
          </div>
        </div>
        <div className="search-wrapper">
          <input
            style={
              pageIsScrolled
                ? { backgroundColor: "var(--grey-dark)", color: "var(--theme)" }
                : { backgroundColor: "white", color: "black" }
            }
            type="text"
            className="search-text f-poppins  trans-03"
            placeholder="Search anime..."
            name="name"
            value={searchForm?.name}
            onChange={(e) => handleSearchForm(e)}
            onKeyDown={(e) => handleKeyPress(e)}
          />
          <Link to={`/search?name=${searchForm?.name}&parameter=title`}>
            <FaSearch
              onClick={() => {
                window.scrollTo({ top: 0 });
                setSearchForm({ name: "" });
              }}
              className="search-icon search-icons trans-03"
              size={20}
              style={
                pageIsScrolled
                  ? {
                      color: "var(--theme)",
                    }
                  : { color: "black" }
              }
            />
          </Link>

          {/* <FaFilter className="filter-icon search-icons" size={20} color="grey" /> */}
        </div>
        <SocialLinks />
        <Actions isInSidebar={false} />
        <div className="user-profile-nots a-center j-center d-flex trans-c-03">
          {screenWidth < 1300 && (
            <FaSearch
              onClick={() => {
                setFloatSearchIsVisible((prev) => !prev);
              }}
            />
          )}
        </div>
      </nav>
      {floatSearchIsVisible && (
        <div className="floating-search-wrapper">
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
              onClick={() => {
                window.scrollTo({ top: 0 });
                setSearchForm({ name: "" });
                setFloatSearchIsVisible(false);
              }}
              className="search-icon search-icons"
              size={20}
              color="black"
            />
          </Link>
        </div>
      )}
    </>
  );
}
