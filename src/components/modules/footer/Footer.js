"use client";
import styles from "./footer.module.css";
import { MdOutlineCopyright } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.container}`}>
        {/* بخش بالا */}
        <div className={styles.topSection}>
          {/* توضیحات و آدرس */}
          <div className={styles.about}>
            <img src="/images/logo_light.png" alt="لوگوی قهوه ست" className={styles.logo} />
            <p className={styles.subtitle}>
              شرکت فنجان داغ خوارزمی، فروشگاه اینترنتی قهوه سِت
            </p>

            <div className={styles.info}>
              <FaRegHeart />
              <p>
                تهران،  
              </p>
            </div>

            <div className={styles.info}>
              <FaRegHeart />
              <p>پیگیری سفارشات: ۲۱-۸۸۲۷</p>
            </div>

            <div className={styles.info}>
              <FaRegHeart />
              <p>maysamghaysari80@gmail.com</p>
            </div>
          </div>

          {/* لینک‌ها */}
          <div className={styles.linksWrapper}>
            <div className={styles.linkGroup}>
              <h4>منوی فوتر</h4>
              <ul>
                <li><Link href="/contact-us">تماس با ما</Link></li>
                <li><Link href="/about-us">درباره ما</Link></li>
                <li><Link href="/rules">قوانین</Link></li>
              </ul>
            </div>

            <div className={styles.linkGroup}>
              <h4>دسترسی سریع</h4>
              <ul>
                <li><Link href="/category">فروشگاه</Link></li>
                <li><Link href="/articles">مقالات</Link></li>
                <li><Link href="/cart">سبد خرید</Link></li>
                <li><Link href="/wishlist">علاقه‌مندی‌ها</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <hr className={styles.divider} />

        {/* بخش پایین */}
        <div className={styles.bottom}>
          <p>
            <MdOutlineCopyright />
            <span> 2023 تمام حقوق متعلق است به </span>
            <strong>قهوه ست</strong> | طراحی و اجرا <strong>میثم قیصری</strong>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
