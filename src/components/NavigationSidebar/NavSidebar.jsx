import React from "react";
import { FaChevronLeft, FaComments } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./nav-sidebar.css";
import Actions from "../Navbar/Actions";
export default function NavSidebar(props) {
  function scrollToTop() {
    window.scrollTo({ top: 0 });
  }
  return (
    <div
      className="navigation-sidebar f-poppins"
      style={{ zIndex: props.sidebarIsOpen ? 100 : -1 }}
      onClick={() => props.setSidebarIsOpen(false)}
    >
      <div
        className="navigation-list d-flex"
        style={{
          transform: props.sidebarIsOpen
            ? "translateX(250px)"
            : "translateX(-250px)",
        }}
      >
        <div className="button-group d-flex-fd-column">
          <div
            className="d-flex a-center j-center close-menu"
            style={{ width: "60%" }}
            onClick={() => props.setSidebarIsOpen()}
          >
            <FaChevronLeft size={12} />
            Close Menu
          </div>
          <Actions isInSidebar={true} />
          <a href="/" className="d-flex a-center j-center">
            <FaComments size={14} />
            Community
          </a>
        </div>

        <div className="navigation-link-list">
          <ul>
            <li>
              <Link onClick={() => scrollToTop()} to="/">
                Home
              </Link>
            </li>
            <li>
              <Link to="/grid/filter?name=bypopularity&heading=Most Popular">
                Most Popular
              </Link>
            </li>
            <li>
              <Link
                onClick={() => scrollToTop()}
                to="/grid/type?typeName=movie&heading=Movies"
              >
                Movies
              </Link>
            </li>
            <li>
              <Link
                onClick={() => scrollToTop()}
                to="/grid/type?typeName=tv&heading=TV Series"
              >
                TV Series
              </Link>
            </li>
            <li>
              <Link
                onClick={() => scrollToTop()}
                to="/grid/type?typeName=ova&heading=OVAs"
              >
                OVAs
              </Link>
            </li>
            <li>
              <Link
                onClick={() => scrollToTop()}
                to="/grid/type?typeName=ona&heading=ONAs"
              >
                ONAs
              </Link>
            </li>
            <li>
              <Link
                onClick={() => scrollToTop()}
                to="/grid/type?typeName=special&heading=Specials"
              >
                Specials
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
