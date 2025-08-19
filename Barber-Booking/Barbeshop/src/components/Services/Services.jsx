import React from "react";
import ServicesCSS from "../Services/Services.module.css";

const Services = () => {
  return (
    <div id="services" className={`${ServicesCSS.Services_wrapper} section`}>
      <small className="section__Heading">Facilities</small>
      <h2 className="section__Tittle">
        Our Best<span> Services</span>
      </h2>
      <div className={ServicesCSS.Services_cards}>
        <div className={ServicesCSS.Services_card}>
          <i className="ri-hotel-line"></i>
          <h3>Basic Facilities</h3>
          <p> - Reception / Front Desk </p>
          <p> - Room Services</p>
          <p> - Wifi & Parking</p>
          <p> - House Keeping</p>
        </div>
        <div className={ServicesCSS.Services_card}>
          <i className="ri-hotel-bed-line"></i>
          <h3>Room Amenities</h3>
          <p> - TV & AC</p>
          <p> - Comfortable Bedding</p>
          <p> - Bed Room & Pool</p>
          <p> - Bar</p>
        </div>
        <div className={ServicesCSS.Services_card}>
          <i className="ri-goblet-line"></i>
          <h3>Dining Option</h3>
          <p> - Room Amenities</p>
          <p> - Comfortable Bedding</p>
          <p> - Bed room & Pool</p>
          <p> - Bar</p>
        </div>
        <div className={ServicesCSS.Services_card}>
          <i className="ri-restaurant-line"></i>
          <h3>Special Features</h3>
          <p> - Custom Rooms</p>
          <p> - Cricket Ground</p>
          <p> - Gym</p>
        </div>
      </div>
    </div>
  );
};

export default Services;
