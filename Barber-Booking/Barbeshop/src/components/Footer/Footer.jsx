import React from "react";
import footerCSS from "../Footer/Footer.module.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div id="footer" className={`${footerCSS.footer_wrapper} section`}>
      <div className={footerCSS.logo}>
        <h2>Pinnacle Cutx</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt
          porro dolorum aspernatur vitae eius modi quos in culpa explicabo
          numquam, fuga molestias sequi, laboriosam possimus.
        </p>
      </div>
      <div className={footerCSS.footerlink}>
        <h3>Quick Links</h3>
        <p>About</p>
        <p>Contact Us</p>
        <p>Rooms</p>
        <p>GYM</p>
        <p>Restaurant</p>
      </div>
      <div className={footerCSS.footerlink}>
        <h3>City Branches</h3>
        <p>Miami</p>
        <p>California</p>
        <p>Philadelphia</p>
        <p>New York</p>
        <p>New Mexico</p>
      </div>
      <div className={footerCSS.footerlink}>
        <h3>Contact</h3>
        <p>
          Address: <span>456 W Eagle, Crossbow, Texas </span>{" "}
        </p>
        <p>
          Email <span>pinnacle@support.com</span>
        </p>
        <p>
          Phone : <span>457-871-9835</span>
        </p>
      </div>

      {/* Copyright Section */}
      <div className={footerCSS.copyright} style={{ textAlign: "center", marginTop: "2rem", color: "#999" }}>
        &copy; {currentYear} Olamore. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
