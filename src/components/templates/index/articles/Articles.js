"use client";
import styles from "./articles.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import BlogCard from "@/components/modules/Blogs/BlogCard";

const Articles = ({blogs}) => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>مقالات ما</p>
      <span className={styles.description}>دانستنی های جذاب دنیای قهوه</span>
      <main>
        <Swiper
        
        
         breakpoints={{
           360:{
            slidesPerView: 2,
            spaceBetween: 0,

          },
          480:{
            slidesPerView: 2,
            spaceBetween: 0,

          },
          // برای صفحه‌های با عرض ۷۶۸ پیکسل و بیشتر
          768: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          // برای صفحه‌های با عرض ۱۰۲۴ پیکسل و بیشتر
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
          slidesPerView={3}
          spaceBetween={30}
          dir="rtl"
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          //   rewind={true}
          loop={true}
          navigation={true}
          modules={[Navigation, Autoplay]}
          className="mySwiper articles_slider"
        >
         {blogs.map((blog) => (
    <SwiperSlide key={blog.slug}>
      <BlogCard blogs={[blog]} />
    </SwiperSlide>
  ))}
        </Swiper>
      </main>
    </div>
  );
};

export default Articles;
