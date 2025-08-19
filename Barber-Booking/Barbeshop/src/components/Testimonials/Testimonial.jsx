import React from "react";
import testimonialCSS from "../Testimonials/Testimonial.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Testimonial = () => {
  return (
    <div id="testimonials" className={`${testimonialCSS.testimonial__wrapper} section`}>
      <small className="section__Heading">Testimonials</small>
      <h3 className="section__Tittle">
        What Our Clients <span>Says</span>{" "}
      </h3>
      <Swiper
        spaceBetween={30}
        modules={[Autoplay]}
        slidesPerView={1}
        autoplay={{ delay: 1000 }}
        // navigation
        pagination={{ clickable: true }}
        loop={true}
        speed={1500}
        breakpoints={
            {
                0:{
                    slidesPerView:1
                },
                1200: {
                    slidesPerView:2
                }
            }
        }
        className={testimonialCSS.swiper}
      >
        <SwiperSlide>
          <div className={testimonialCSS.testimonial}>
            <img
              src="https://st2.depositphotos.com/1010683/7599/i/450/depositphotos_75996805-stock-photo-caucasian-handsome-businessman-in-white.jpg"
              alt=""
            />
            <div className={testimonialCSS.content}>
              <h3>
                John Doe <span>Manager</span>
              </h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
                necessitatibus consequuntur rerum qui nostrum ratione illum.
                Eligendi asperiores illum deserunt eius veniam. Voluptatum
                dolore veniam atque voluptate dolorem odit.
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={testimonialCSS.testimonial}>
            <img
              src="https://t4.ftcdn.net/jpg/01/76/64/91/360_F_176649178_kXFRFqR6fu3H2gkZz5ZRs32vee3TW0W6.jpg"
              alt="Taylor"
            />
            <div className={testimonialCSS.content}>
              <h3>
                Earl Taylor <span>Sales Manager</span>
              </h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
                necessitatibus consequuntur rerum qui nostrum ratione illum.
                Eligendi asperiores illum deserunt eius veniam. Voluptatum
                dolore veniam atque voluptate dolorem odit.
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={testimonialCSS.testimonial}>
            <img
              src="https://t3.ftcdn.net/jpg/06/50/49/08/360_F_650490808_jcE1Bi3hD4WucjJBzxNaUZ5faLYXoqTV.jpg"
              alt="Prelta"
            />
            <div className={testimonialCSS.content}>
              <h3>
                Perelta Anny <span>Supervisor</span>
              </h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
                necessitatibus consequuntur rerum qui nostrum ratione illum.
                Eligendi asperiores illum deserunt eius veniam. Voluptatum
                dolore veniam atque voluptate dolorem odit.
              </p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Testimonial;
