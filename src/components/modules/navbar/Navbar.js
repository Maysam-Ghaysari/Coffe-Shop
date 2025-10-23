"use client";
import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import { FaShoppingCart, FaRegHeart, FaRegUser, FaBars, FaTimes } from "react-icons/fa";

function Navbar({ isLogin }) {
  const [fixTop, setFixTop] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // افکت برای مدیریت اسکرول و چسبیدن نوبار به بالا
  useEffect(() => {
    const fixNavbarToTop = () => {
      setFixTop(window.scrollY > 80);
    };

    window.addEventListener("scroll", fixNavbarToTop);

    // جلوگیری از اسکرول شدن صفحه وقتی منوی موبایل باز است
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";

    // پاکسازی event listener در زمان unmount شدن کامپوننت
    return () => {
      window.removeEventListener("scroll", fixNavbarToTop);
      document.body.style.overflow = "auto"; // اطمینان از بازگشت اسکرول به حالت عادی
    };
  }, [isMenuOpen]); // این افکت به باز و بسته شدن منو حساس است

  // توابع برای مدیریت وضعیت منوی موبایل
  const handleMenuToggle = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    // از Fragment استفاده می‌کنیم تا بتوانیم backdrop را کنار header قرار دهیم
    <>
      {/* این لایه نیمه‌شفاف در حالت موبایل وقتی منو باز است نمایش داده می‌شود */}
      {isMenuOpen && <div className={styles.backdrop} onClick={closeMenu}></div>}

      <header className={styles.navbar_container}>
        <nav className={`${styles.navbar} ${fixTop ? styles.navbar_fixed : ""}`}>
          
          {/* بخش لوگو */}
          <div className={styles.logo_container}>
            <Link href="/" onClick={closeMenu}>
              {/* اطمینان حاصل کنید که مسیر لوگوی شما درست است */}
              <img src="/images/logo.png" alt="Logo" />
            </Link>
          </div>

          {/* آیکون همبرگر برای باز و بسته کردن منو در موبایل */}
          <button
            className={styles.hamburger_icon}
            onClick={handleMenuToggle}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* لیست لینک‌های منو */}
          <ul className={`${styles.links} ${isMenuOpen ? styles.links_active : ""}`}>
            <li onClick={closeMenu}><Link href="/">صفحه اصلی</Link></li>
            <li onClick={closeMenu}><Link href="/category">فروشگاه</Link></li>
            <li onClick={closeMenu}><Link href="/blog">وبلاگ</Link></li>
            <li onClick={closeMenu}><Link href="/contact-us">تماس با ما</Link></li>
            <li onClick={closeMenu}><Link href="/about-us">درباره ما</Link></li>
            <li onClick={closeMenu}><Link href="/rules">قوانین</Link></li>
          </ul>

          {/* بخش آیکون‌ها و پروفایل کاربر */}
          <div className={styles.navbar_actions}>
            <Link href="/cart" className={styles.action_icon}>
              <FaShoppingCart />
              {/* این عدد باید داینامیک باشد */}
              <span>1</span>
            </Link>

            <Link href="/wishlist" className={styles.action_icon}>
              <FaRegHeart />
              {/* این عدد باید داینامیک باشد */}
              <span>1</span>
            </Link>

            <div className={styles.user_section}>
              {!isLogin ? (
                // حالت لاگین‌نشده
                <div className={styles.login_desktop}>
                  <Link href="/login-register">ورود / عضویت</Link>
                </div>
              ) : (
                // حالت لاگین‌شده با منوی کشویی
                <div className={styles.dropdown}>
                  <button className={styles.user_profile_link} aria-label="User menu">
                    <FaRegUser />
                    <IoIosArrowDown />
                  </button>
                  <div className={styles.dropdown_content}>
                    <Link href="/p-user/orders">سفارشات</Link>
                    <Link href="/p-user/tickets">تیکت‌های پشتیبانی</Link>
                    <Link href="/p-user/comments">کامنت‌ها</Link>
                    <Link href="/p-user/wishlist">علاقه‌مندی‌ها</Link>
                    <Link href="/p-user/account-details">جزئیات اکانت</Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Navbar;