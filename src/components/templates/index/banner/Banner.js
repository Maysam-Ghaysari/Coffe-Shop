"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./Banner.module.css";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// Swiper modules
import { Navigation, Autoplay } from "swiper/modules";

function Banner() {
  return (
    <div className={styles.bannerContainer}>
      <Swiper 
      className={styles.mySwiper}
        loop={true}
        autoplay={{ delay: 1500 }}
        modules={[Navigation, Autoplay]}
      >
        <SwiperSlide>
          <div className={styles.slideWrapper}>
            <Image 
              src="/images/Banner/a2.jpg"
              alt="Slide 1"
              width={1920}
              height={850}
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className={styles.slideWrapper}>
            <Image
              src="/images/Banner/b4.jpg"
              alt="Slide 2"
                 width={1920}
              height={850}
              
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className={styles.slideWrapper}>
            <Image
              src="/images/Banner/slide1.jpg"
              alt="Slide 3"
              fill
            />
          </div>
        </SwiperSlide> 
      </Swiper>
    </div>
  );
}

export default Banner;
