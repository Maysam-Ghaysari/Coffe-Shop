"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { useState } from "react";
import styles from "./gallery.module.css";

const Gallery = ({ product }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const images = [product.img];

  return (
    <section className={styles.gallery}>
      {/* اسلایدر اصلی */}
      <Swiper
        style={{
          "--swiper-navigation-color": "#333",
          "--swiper-pagination-color": "#333",
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className={`mySwiper2 gallery-slider`}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img src={img} alt={`product-${index}`} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* اسلایدر بندانگشتی‌ها */}
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className={`gallery-slider-2`}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img}
              alt={`thumb-${index}`}
              className={index === activeIndex ? styles.activeThumb : ""}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Gallery;
