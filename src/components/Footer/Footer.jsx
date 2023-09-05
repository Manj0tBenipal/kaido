import React from "react";
import "./footer.css";
import logo from "../../media/logo.png";
import SocialLinks from "../Navbar/SocialLinks";
import { Link } from "react-router-dom";
export default function Footer() {
  function getAlphabets() {
    const alphabets = [];
    const startChar = "A".charCodeAt(0);
    const endChar = "Z".charCodeAt(0);
    for (let i = startChar; i <= endChar; i++) {
      alphabets.push(String.fromCharCode(i));
    }
    const links = alphabets.map((el) => {
      return (
        <Link
          to={`/search?name=${el}&parameter=letter`}
          key={el}
          className="alphabet-tile"
          onClick={() => window.scrollTo({ top: 0 })}
        >
          {el}
        </Link>
      );
    });
    return [...links];
  }
  const links = getAlphabets();

  return (
    <div className="footer-container d-flex-fd-column j-center">
      <div className="logo-social-links d-flex">
        <Link
          className="main-element"
          to="/"
          onClick={() => window.scrollTo({ top: 0 })}
        >
          <img src={logo} className="logo" />
        </Link>
        <SocialLinks />
      </div>
      <div className="help-text d-flex">
        <h2 className="main-element">A-Z List</h2>
        <span>Searching anime order by alphabet name A to Z.</span>
      </div>
      <div className="alphabet-list d-flex">{links}</div>
      <div className="copyright-text">
        <p>
          Kaido does not store any files on our server; we only link to the
          media which is hosted on 3rd party services.
        </p>
        <p>&copy; Kaido All rights reserved.</p>
      </div>
    </div>
  );
}
