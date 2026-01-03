"use client";
import Product from "@/components/modules/product/Product";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import styles from "./moreproduct.module.css"; // بهتر است استایل‌ها در فایل CSS باشند

const MoreProducts = ({ relaitedProducts }) => {
  return (
    <div data-aos="fade-right" className={styles.container}>
      <section className={styles.title_section}>
        <h2>محصولات مرتبط</h2>
        <div className={styles.underline}></div>
      </section>

      <Swiper
        // تنظیمات رسپانسیو برای نمایش درست در موبایل و تبلت
        breakpoints={{
          320: { slidesPerView: 2, spaceBetween: 10 },
          480: { slidesPerView: 2, spaceBetween: 20 },
          768: { slidesPerView: 3, spaceBetween: 30 },
          1024: { slidesPerView: 4, spaceBetween: 30 },
        }}
        dir="rtl"
        rewind={true}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        {relaitedProducts.map((product) => (
          <SwiperSlide key={product._id}>
            {/* 
               باید کل شیء محصول (item یا product) را به کامپوننت بفرستید
            */}
            <Product {...product} /> 
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MoreProducts;