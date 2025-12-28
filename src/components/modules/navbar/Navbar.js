"use client";
import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { FaShoppingCart, FaRegHeart, FaRegUser , FaBars, FaTimes } from "react-icons/fa";

function Navbar({ isLogin }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  const handleMenuToggle = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      {isMenuOpen && <div className={styles.backdrop} onClick={closeMenu}></div>}

      <header className={styles.navbar_container}>
        <nav className={styles.navbar}>
          <div className={styles.logo_container}>
            <Link href="/" onClick={closeMenu}>
              <img src="/images/logo.png" alt="Logo" />
            </Link>
          </div>


          <ul className={`${styles.links} ${isMenuOpen ? styles.links_active : ""}`}>
            <li onClick={closeMenu}><Link href="/">صفحه اصلی</Link></li>
            <li onClick={closeMenu}><Link href="/category">فروشگاه</Link></li>
            <li onClick={closeMenu}><Link href="/blogs">وبلاگ</Link></li>
            <li onClick={closeMenu}><Link href="/contact-us">تماس با ما</Link></li>
            <li onClick={closeMenu}><Link href="/about-us">درباره ما</Link></li>
            <li onClick={closeMenu}><Link href="/rules">قوانین</Link></li>
         
          </ul>
          <div className={styles.navbar_actions}>
            <Link href="/cart" className={styles.action_icon}>
              <FaShoppingCart />
              <span>0</span>
            </Link>

            <Link href="/wishlist" className={styles.action_icon}>
              <FaRegHeart />
              <span>0</span>
            </Link>

            <div className={styles.user_section}>
              {!isLogin ? (
                <div className={styles.login_desktop}>
                  <Link href="/login-register">ورود / عضویت</Link>
                </div>
              ) : (
                <div className={styles.dropdown}>
                  <Link href="/p-user">
                  <div className={styles.user_profile_link} aria-label="User menu">
              <FaRegUser />
                  </div>
                  </Link>
          

                </div>
              )}
            </div>
            
          <button
            className={styles.hamburger_icon}
            onClick={handleMenuToggle}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
