import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import amenitiesCSS from "../Amenities/Amenities.module.css";

const Amenities = () => {
  return (
    <div id="amenities" className={`${amenitiesCSS.amenities_wrapper} section`}>
      <small className="section__Heading">Luxury Amenities</small>
      <h3 className="section__Tittle">
        Our Best <span>Amenities</span>{" "}
      </h3>
      <Swiper
        spaceBetween={30}
        modules={[Autoplay, ]}
        slidesPerView={1}
        autoplay={{ delay: 1000 }}
        // navigation
        pagination={{ clickable: true }}
        loop={true}
        speed={2000}
        className={amenitiesCSS.swiper}
      >
        <SwiperSlide>
          <div className={amenitiesCSS.amenities_item}>
            <img
              src="https://www.forbesglobalproperties.com/wp-content/uploads/2021/02/514-Chalette-Drive-swimming-pool-night.jpg"
              alt="amenities"
            />
            <div className={amenitiesCSS.content}>
              <h2>Swimming Pool</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
                expedita reiciendis quidem id, nihil ducimus illum vero animi.
                In incidunt magni earum nobis eligendi perspiciatis.
              </p>
              <button>Book Now !</button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={amenitiesCSS.amenities_item}>
            <img
              src="https://content.jdmagicbox.com/comp/jamnagar/l4/0288px288.x288.220420114147.i6l4/catalogue/specials-restro-and-cafe-airport-road-jamnagar-coffee-shops-17ab39nzwl.jpg"
              alt="amenities"
            />
            <div className={amenitiesCSS.content}>
              <h2>Retro & Cafe</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
                expedita reiciendis quidem id, nihil ducimus illum vero animi.
                In incidunt magni earum nobis eligendi perspiciatis.
              </p>
              <button>Book Now !</button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={amenitiesCSS.amenities_item}>
            <img
              //   width="100%"
              //   height="auto"
              src="https://rexclarkeadventures.com/wp-content/uploads/2025/02/i-Fitness-Gym-Yaba-Lagos-Nigeria-TortoisePathcom-10-jpeg.webp"
              alt="amenities"
            />
            <div className={amenitiesCSS.content}>
              <h2>Gym & Sports</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
                expedita reiciendis quidem id, nihil ducimus illum vero animi.
                In incidunt magni earum nobis eligendi perspiciatis.
              </p>
              <button>Book Now !</button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Amenities;
