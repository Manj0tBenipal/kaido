import React, { useState, useEffect, Suspense } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import NavSidebar from "../components/NavigationSidebar/NavSidebar";
import Footer from "../components/Footer/Footer";
import { easeOut, motion } from "framer-motion";
import LoadingSpinner from "../components/LoadingSpinner";
export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition =
        window.scrollY || document.documentElement.scrollTop;
      if (scrollPosition > 0 && isScrolled === false) {
        setIsScrolled(true);
      } else if (scrollPosition === 0) {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScrolled]);
  return (
    <motion.div
      className="app-container f-poppins"
      animate={{ y: [-window.innerHeight / 4, 10, 0] }}
      transition={{ duration: 0.3, ease: easeOut }}
    >
      <Navbar
        isScrolled={isScrolled}
        sidebarIsOpen={sidebarIsOpen}
        setSidebarIsOpen={setSidebarIsOpen}
      />
      <NavSidebar
        sidebarIsOpen={sidebarIsOpen}
        setSidebarIsOpen={setSidebarIsOpen}
      />
      <Suspense fallback={<LoadingSpinner />}>
        <Outlet />
      </Suspense>

      <Footer />
    </motion.div>
  );
}
