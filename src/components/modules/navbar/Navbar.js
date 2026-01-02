"use client";
import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { 
  FaShoppingCart, FaRegHeart, FaRegUser, 
  FaBars, FaTimes, FaHome, FaBook, 
  FaPhoneAlt, FaInfoCircle, FaGavel 
} from "react-icons/fa";

function Navbar({ isLogin }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  // جلوگیری از ناهماهنگی رندر سرور و کلاینت
  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [isMenuOpen]);

  const handleMenuToggle = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      {/* لایه تیره پشت منو */}
      <div className={`${styles.backdrop} ${isMenuOpen ? styles.backdrop_active : ""}`} onClick={closeMenu}></div>

      <header className={styles.navbar_container}>
        <nav className={styles.navbar}>
          
          <div className={styles.logo_container}>
            <Link href="/" onClick={closeMenu}>
              <img src="/images/logo.png" alt="Logo" />
            </Link>
          </div>

          {/* لیست لینک‌ها */}
          <ul className={`${styles.links} ${isMenuOpen ? styles.links_active : ""}`}>
            <div className={styles.mobile_header}>
              <img src="/images/logo.png" alt="Logo" />
              <button onClick={closeMenu} className={styles.close_btn}><FaTimes /></button>
            </div>

            <li onClick={closeMenu}>
              <Link href="/"><FaHome className={styles.m_icon}/> صفحه اصلی</Link>
            </li>
            <li onClick={closeMenu}>
              <Link href="/blogs"><FaBook className={styles.m_icon}/> وبلاگ</Link>
            </li>
            <li onClick={closeMenu}>
              <Link href="/contact-us"><FaPhoneAlt className={styles.m_icon}/> تماس با ما</Link>
            </li>
            <li onClick={closeMenu}>
              <Link href="/about-us"><FaInfoCircle className={styles.m_icon}/> درباره ما</Link>
            </li>
            <li onClick={closeMenu}>
              <Link href="/rules"><FaGavel className={styles.m_icon}/> قوانین</Link>
            </li>

            <div className={styles.mobile_footer}>
              <p>بیدار شدن با طعم قهوه سِت</p>
            </div>
          </ul>

          <div className={styles.navbar_actions}>
            <Link href="/cart" className={styles.action_icon}>
              <FaShoppingCart />
            </Link>

            <Link href="/wishlist" className={styles.action_icon}>
              <FaRegHeart />
            </Link>

            <div className={styles.user_section}>
              {hasMounted && (
                !isLogin ? (
                  <Link href="/login-register" className={styles.login_desktop}>
                    ورود / عضویت
                  </Link>
                ) : (
                  <Link href="/p-user" className={styles.user_profile_link}>
                    <span aria-label="User menu">
                      <FaRegUser />
                    </span>
                  </Link>
                )
              )}
            </div>

            <button className={styles.hamburger_icon} onClick={handleMenuToggle}>
              <FaBars />
            </button>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Navbar;