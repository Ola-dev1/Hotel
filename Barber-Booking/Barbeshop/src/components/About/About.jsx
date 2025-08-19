import React from "react";
import aboutCSS from "../About/About.module.css";

const About = () => {
  return (
    <div id="about-us" className={`${aboutCSS.about_wrapper} section`}>
      <div className={aboutCSS.about_img}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9E3GYDWXqjvzojiBMuC2NL62kTwAwPxCsJg&s"
          alt="About"
          width={400}
          height={300}
        />
      </div>
      <div className={aboutCSS.about_content}>
        <small className="section__Heading">The Royal Hotel</small>
        <h2 className="section__Tittle">
          Where Elegance Meets <span> Excellance</span>
        </h2>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis
          magnam libero modi iste molestias ut facere, voluptate eum dolores
          alias vitae harum laudantium id aliquid?
        </p>
        <div className={aboutCSS.Cards}>
          <p>
            260+ <span>Awards Wins</span>
          </p>{" "}
          <p>
            250K+ <span>Visitors Visit</span>
          </p>{" "}
          <p>
            150K+ <span>Events </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
