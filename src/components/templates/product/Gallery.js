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

  // اگر آرایه گالری ندارید، از عکس اصلی به صورت آرایه استفاده می‌کنیم
  const images = product.gallery?.length > 0 ? product.gallery : [product.img];

  return (
    <section className={styles.gallery_wrapper}>
      {/* اسلایدر اصلی */}
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-navigation-size": "25px",
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        modules={[FreeMode, Navigation, Thumbs]}
        className={styles.main_slider}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index} className={styles.main_slide}>
            <img src={img} alt={`product-${index}`} loading="lazy" />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* اسلایدر بندانگشتی‌ها (فقط اگر بیش از یک عکس وجود داشت) */}
      {images.length > 0 && (
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={12}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className={styles.thumb_slider}
        >
          {images.map((img, index) => (
            <SwiperSlide key={index} className={styles.thumb_slide}>
              <div className={`${styles.thumb_box} ${index === activeIndex ? styles.activeThumb : ""}`}>
                <img src={img} alt={`thumb-${index}`} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
};

export default Gallery;