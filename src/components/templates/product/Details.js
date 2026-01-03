"use client";
import { FaFacebookF, FaStar, FaTwitter, FaRegStar, FaTelegram, FaLinkedinIn, FaPinterest } from "react-icons/fa";
import { IoCheckmark } from "react-icons/io5";
import { TbSwitch3 } from "react-icons/tb";
import styles from "./details.module.css";
import Breadcrumb from "./Breadcrumb";
import AddToWishlist from "./AddToWishlist";
import { useState } from "react";
import { showSwal } from "@/utils/helpers";

const Details = ({ product }) => {
  const [count, setCount] = useState(1);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const isInCart = cart.find((item) => item.id === product._id);

    if (isInCart) {
      isInCart.count += count;
    } else {
      cart.push({
        id: product._id,
        name: product.name,
        price: product.price,
        count,
        img: product.img,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    showSwal("محصول با موفقیت به سبد خرید اضافه شد", "success", "فهمیدم");
  };

  return (
    <main className={styles.details_main}>
      <Breadcrumb title={product.name} />
      <h1 className={styles.title}>{product.name}</h1>

      <div className={styles.rating}>
        <div className={styles.stars}>
          {[...Array(5)].map((_, index) => (
            index < product.score ? <FaStar key={index} /> : <FaRegStar key={index} />
          ))}
        </div>
        <p className={styles.comment_count}>(دیدگاه {product.comments?.length || 0} کاربر)</p>
      </div>

      <p className={styles.price}>{product.price?.toLocaleString()} تومان</p>
      <p className={styles.short_description}>{product.shortDescription}</p>

      <hr className={styles.divider} />

      <div className={styles.stock_status}>
        <IoCheckmark />
        <p>موجود در انبار</p>
      </div>

      <div className={styles.cart_action}>
        <div className={styles.counter}>
          <span onClick={() => setCount(prev => prev + 1)}>+</span>
          {count}
          <span onClick={() => count > 1 && setCount(prev => prev - 1)}>-</span>
        </div>
        <button className={styles.add_to_cart_btn} onClick={addToCart}>
            افزودن به سبد خرید
        </button>
      </div>

      <section className={styles.meta_actions}>
        <AddToWishlist productID={product._id} />
        <div className={styles.compare}>
          {/* <TbSwitch3 />
          <a href="#">مقایسه</a> */}
        </div>
      </section>

      <hr className={styles.divider} />

      <div className={styles.product_meta}>
        <p><strong>شناسه محصول:</strong> <span>{product._id}</span></p>
        <p>
          <strong>برچسب‌ها:</strong>
          <span>{product.tags?.join(" ، ")}</span>
        </p>
      </div>

      <div className={styles.share_section}>
        <p>اشتراک‌گذاری: </p>
        <div className={styles.social_icons}>
          <a href="#"><FaTelegram /></a>
          <a href="#"><FaLinkedinIn /></a>
          <a href="#"><FaPinterest /></a>
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaFacebookF /></a>
        </div>
      </div>
    </main>
  );
};

export default Details;