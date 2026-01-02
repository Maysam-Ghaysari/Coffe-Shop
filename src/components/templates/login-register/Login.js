"use client";
import React, { useState } from "react";
import styles from "./login.module.css";
import Link from "next/link";
import Sms from "./Sms";
import { showSwal } from "@/utils/helpers";
import { valiadteEmail, valiadtePassword } from "@/utils/auth";
import swal from "sweetalert";

const Login = ({ showRegisterForm }) => {
  const [isLoginWithOtp, setIsLoginWithOtp] = useState(false);
  const [password, setPassword] = useState("");
  const [phoneOrEmail, setPhoneOrEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false); // اضافه کردن وضعیت لودینگ

  const hideOtpForm = () => setIsLoginWithOtp(false);

  const loginWithPassword = async (e) => {
    if (e) e.preventDefault();
    
    if (!phoneOrEmail) return showSwal("لطفا شماره تماس یا ایمیل را وارد کنید", "error", "تلاش مجدد");

    // چک کردن ایمیل فقط در صورتی که شماره نباشد (یک منطق ساده)
    if (isNaN(phoneOrEmail) && !valiadteEmail(phoneOrEmail)) {
      return showSwal("ایمیل وارد شده صحیح نیست", "error", "تلاش مجدد");
    }

    if (!password) return showSwal("پسورد را وارد کنید", "error", "تلاش مجدد");
    
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: phoneOrEmail, password }),
      });

      if (res.ok) {
        swal({
          title: "خوش آمدید!",
          text: "با موفقیت وارد شدید",
          icon: "success",
          button: "ورود به پنل",
        }).then(() => {
          location.replace("/p-user");
        });
      } else {
        const errorData = await res.json();
        showSwal(errorData.message || "اطلاعات ورود صحیح نیست", "error", "تلاش مجدد");
      }
    } catch (err) {
      showSwal("خطایی در اتصال به سرور رخ داد", "error", "تلاش مجدد");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    
      {!isLoginWithOtp ? (
        
        <div className={styles.form_container} data-aos="fade-left">
          
          <div className={styles.form_card}>
            
            <h2 className={styles.title}>ورود به حساب</h2>
            <p className={styles.subtitle}>خوشحالیم که دوباره شما را می‌بینیم!</p>

            {/* ایمیل / موبایل */}
            <div className={styles.input_group}>
              <input
                className={styles.input}
                type="text"
                value={phoneOrEmail}
                onChange={(e) => setPhoneOrEmail(e.target.value)}
                placeholder=" "
                onKeyDown={(e) => e.key === "Enter" && loginWithPassword()}
              />
              <label className={styles.input_label}>ایمیل یا شماره موبایل</label>
            </div>

            {/* رمز عبور */}
            <div className={styles.input_group}>
              <input
                className={styles.input}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=" "
                onKeyDown={(e) => e.key === "Enter" && loginWithPassword()}
              />
              <label className={styles.input_label}>رمز عبور</label>
            </div>

            <div className={styles.options}>
              <label className={styles.checkbox_label}>
                <input type="checkbox" />
                <span>مرا به یاد داشته باش</span>
              </label>
              <Link href="/forget-password" className={styles.forgot_link}>
                فراموشی رمز؟
              </Link>
            </div>

            <button 
              className={styles.btn_main} 
              onClick={loginWithPassword}
              disabled={isLoading}
            >
              {isLoading ? "در حال بررسی..." : "ورود"}
            </button>

            <div className={styles.divider}>
              <span>یا</span>
            </div>

            <button onClick={() => setIsLoginWithOtp(true)} className={styles.btn_otp}>
              ورود با کد یکبار مصرف (SMS)
            </button>

            <div className={styles.footer_text}>
              <span>حساب کاربری ندارید؟</span>
              <button onClick={showRegisterForm} className={styles.btn_switch}>ثبت نام کنید</button>
            </div>
          </div>
          <Link href="/" className={styles.back_home}>بازگشت به صفحه اصلی</Link>
        </div>
      ) : (
        <Sms hideOtpForm={hideOtpForm} />
      )}
    </>
  );
};

export default Login;