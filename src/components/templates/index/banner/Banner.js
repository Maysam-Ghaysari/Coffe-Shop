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
        autoplay={{ delay: 1000 }}
        modules={[Navigation, Autoplay]}
      >
        <SwiperSlide>
          <div className={styles.slideWrapper}>
            <Image 
              src="/images/Banner/slide4.jpg"
              alt="Slide 1"
              fill
              priority
            />
          </div>
        </SwiperSlide>
{/* 
        <SwiperSlide>
          <div className={styles.slideWrapper}>
            <Image
              src="/images/Banner/slide2.jpg"
              alt="Slide 2"
              fill
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className={styles.slideWrapper}>
            <Image
              src="/images/Banner/slide3.jpg"
              alt="Slide 3"
              fill
            />
          </div>
        </SwiperSlide> */}
      </Swiper>
    </div>
  );
}

export default Banner;
