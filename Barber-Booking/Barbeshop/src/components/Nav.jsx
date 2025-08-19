import React, { useRef } from "react";
import navCSS from "./Nav/Nav.module.css";

const Nav = () => {
  const menu = useRef();
  const navbar = useRef();

  const menuHandler = () => {
    menu.current.classList.toggle(navCSS.showNav);
  };

  const handleScrollToSection = (e, sectionId) => {
    e.preventDefault(); // prevent default anchor jump
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      // optionally close menu on mobile after clicking
      menu.current.classList.remove(navCSS.showNav);
    }
  };

  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      navbar.current.classList.add(navCSS.navbarScroll);
    } else {
      navbar.current.classList.remove(navCSS.navbarScroll);
    }
  });

  return (
    <div className={navCSS.nav_wrapper} ref={navbar}>
      <div className={navCSS.logo}>
        <a href="#home" onClick={(e) => handleScrollToSection(e, "home")}>
          <span>Pinnacle</span> Hotel
        </a>
      </div>
      <ul ref={menu}>
        <li>
          <a href="#home" onClick={(e) => handleScrollToSection(e, "home")}>
            Home
          </a>
        </li>
        <li>
          <a
            href="#about-us"
            onClick={(e) => handleScrollToSection(e, "about-us")}
          >
            About Us
          </a>
        </li>
        <li>
          <a
            href="#blogs"
            onClick={(e) => handleScrollToSection(e, "services")}
          >
            Services
          </a>
        </li>
        <li>
          <a href="#rooms" onClick={(e) => handleScrollToSection(e, "rooms")}>
            Rooms
          </a>
        </li>
        <li>
          <a
            href="#category"
            onClick={(e) => handleScrollToSection(e, "amenities")}
          >
            Amenities
          </a>
        </li>

        <li>
          <a
            href="#testimonials"
            onClick={(e) => handleScrollToSection(e, "testimonials")}
          >
            Testimonials
          </a>
        </li>
      </ul>
      <div className={navCSS.Nav_btns}>
        <button className={navCSS.btn}>Book Now</button>
        <i
          className="ri-menu-4-line"
          id={navCSS.bars}
          onClick={menuHandler}
        ></i>
      </div>
    </div>
  );
};

export default Nav;
