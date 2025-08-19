import React from "react";
import headerCSS from "../Header/Header.module.css";

// Import Swiper core and required modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Parallax } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Header = () => {
  return (
    <div id="home" className={headerCSS.header_wrapper}>
      <Swiper
        className={headerCSS.swiper}
        slidesPerView={1}
        spaceBetween={0}
        parallax={true}
        modules={[Autoplay]}
        speed={1500}
        // navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
      >
        <SwiperSlide>
          <div className={`${headerCSS.Header_slide} ${headerCSS.slide1}`}>
            <div className={headerCSS.content}>
              <small data-swiper-parallax="-200">
                Luxury Hotel & Restaurant
              </small>
              <h2 data-swiper-parallax="-400">
                Enjoy Your <span>Dream</span> Time With <br />
                <span>Luxury</span> Experience
              </h2>
              <p data-swiper-parallax="-600">
                Call Now <span>986-6545-031</span>
              </p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className={`${headerCSS.Header_slide} ${headerCSS.slide2}`}>
            <div className={headerCSS.content}>
              <small data-swiper-parallax="-200">
                Luxury Hotel & Restaurant
              </small>
              <h2 data-swiper-parallax="-400">
                Enjoy Your <span>Dream</span> Time With <br />
                <span>Luxury</span> Experience
              </h2>
              <p data-swiper-parallax="-600">
                Call Now <span>986-6545-031</span>
              </p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className={`${headerCSS.Header_slide} ${headerCSS.slide3}`}>
            <div className={headerCSS.content}>
              <small data-swiper-parallax="-200">
                Luxury Hotel & Restaurant
              </small>
              <h2 data-swiper-parallax="-400">
                Enjoy Your <span>Dream</span> Time With <br />
                <span>Luxury</span> Experience
              </h2>
              <p data-swiper-parallax="-600">
                Call Now <span>986-6545-031</span>
              </p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Header;
