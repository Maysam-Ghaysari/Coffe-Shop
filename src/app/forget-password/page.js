"use client";
import React, { useState } from "react";
import styles from "@/styles/forget-password.module.css";
import Link from "next/link";
import { showSwal } from "@/utils/helpers";

const ForgotPassword = () => {
  const [identifier, setIdentifier] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!identifier) {
      return showSwal("لطفاً ایمیل یا شماره موبایل خود را وارد کنید", "error", "تلاش مجدد");
    }
    
    setIsLoading(true);
    // در اینجا منطق اتصال به API را پیاده کنید
    setTimeout(() => {
      setIsLoading(false);
      showSwal("لینک بازنشانی پیامک/ایمیل شد", "success", "فهمیدم");
    }, 2000);
  };

  return (
    <div className={styles.forgot_container}>
      <div className={styles.auth_box} data-aos="zoom-in">
        
        {/* بخش فرم - سمت راست */}
        <div className={styles.form_section}>
          <div className={styles.header}>
            <h2 className={styles.title}>فراموشی رمز عبور</h2>
            <p className={styles.subtitle}>
              ایمیل یا شماره موبایل خود را وارد کنید تا لینک بازنشانی برایتان ارسال شود.
            </p>
          </div>

          <form onSubmit={handleResetPassword} className={styles.form_wrapper}>
            <div className={styles.input_group}>
              <input
                className={styles.input}
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder=" "
                required
              />
              <label className={styles.floating_label}>ایمیل / شماره موبایل</label>
            </div>

            <button 
              type="submit" 
              className={styles.btn_primary}
              disabled={isLoading}
            >
              {isLoading ? "در حال ارسال..." : "بازنشانی رمز عبور"}
            </button>
          </form>

          <div className={styles.footer_links}>
            <Link href="/login-register" className={styles.back_link}>
              برگشت به صفحه ورود
            </Link>
          </div>
        </div>

        {/* بخش تصویر - سمت چپ (بزرگ‌تر) */}
        <div className={styles.image_section}>
          <div className={styles.image_overlay}>
            <h2>نگران نباشید!</h2>
            <p>ما به شما کمک می‌کنیم تا دوباره به حساب کاربری خود دسترسی پیدا کنید.</p>
          </div>
          <img
            src="/images/Banner/a2.jpg"
            alt="Coffee Brain"
            className={styles.auth_img}
          />
        </div>

      </div>
      <Link href="/" className={styles.cancel_btn}>لغو و بازگشت به خانه</Link>
    </div>
  );
};

export default ForgotPassword;