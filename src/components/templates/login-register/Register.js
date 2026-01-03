"use client";
import React, { useState } from "react";
import styles from "./register.module.css";
import Sms from "./Sms";
import { showSwal } from "@/utils/helpers";
import {
  valiadteEmail,
  validateName,
  valiadtePassword,
  validatePhone,
} from "@/utils/auth";
import Link from "next/link";

const Register = ({ showloginForm }) => {
  const [isRegisterWithPass, setIsRegisterWithPass] = useState(false);
  const [isRegisterWithOtp, setIsRegisterWithOtp] = useState(false);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const hideOtpForm = () => setIsRegisterWithOtp(false);

  const signUP = async () => {
    // Validation
    if (!validateName(name)) return showSwal("نام وارد شده باید بیش از ۲ کاراکتر باشد", "error", "فهمیدم");
    if (!validatePhone(phone)) return showSwal("شماره موبایل وارد شده صحیح نیست", "error", "فهمیدم");
    if (email && !valiadteEmail(email)) return showSwal("ایمیل را به درستی وارد کنید", "error", "فهمیدم");
    if (!valiadtePassword(password)) return showSwal("رمز عبور باید حداقل ۸ کاراکتر و ترکیبی باشد", "error", "فهمیدم");

    setLoading(true);
    try {
      const user = { name, email, password, phone };
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (res.status === 201) {
        showSwal("ثبت نام با موفقیت انجام شد", "success", "ورود به پنل").then(() => {
          showloginForm();
        });
      } else if (res.status === 422) {
        showSwal("کاربری با این مشخصات (ایمیل یا شماره) از قبل وجود دارد", "error", "متوجه شدم");
      }
    } catch (error) {
      showSwal("خطایی در اتصال رخ داد", "error", "تلاش مجدد");
    } finally {
      setLoading(false);
    }
  };

  return !isRegisterWithOtp ? (
    <div className={styles.form_container} data-aos="fade-right">
      <div className={styles.form_card}>
        <h2 className={styles.title}>ایجاد حساب کاربری</h2>
        <p className={styles.subtitle}>به خانواده قهوه سِت خوش آمدید!</p>

        <div className={styles.form_wrapper}>
          {/* نام کاربری */}
          <div className={styles.input_group}>
            <input
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              required
              placeholder=" "
            />
            <label className={styles.floating_label}>نام و نام خانوادگی</label>
          </div>

          {/* شماره موبایل */}
          <div className={styles.input_group}>
            <input
              className={styles.input}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="text"
              required
              placeholder=" "
            />
            <label className={styles.floating_label}>شماره موبایل</label>
          </div>

          {/* ایمیل */}
          <div className={styles.input_group}>
            <input
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder=" "
            />
            <label className={styles.floating_label}>ایمیل (اختیاری)</label>
          </div>

          {/* رمز عبور - نمایش شرطی */}
          {isRegisterWithPass && (
            <div className={styles.input_group} data-aos="zoom-in">
              <input
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
                placeholder=" "
              />
              <label className={styles.floating_label}>رمز عبور</label>
            </div>
          )}

          {/* دکمه‌های عملیاتی */}
          <div className={styles.action_buttons}>
            {!isRegisterWithPass && (
              <button onClick={() => setIsRegisterWithOtp(true)} className={styles.btn_otp}>
                ثبت نام با کد تایید (SMS)
              </button>
            )}

            <button
              onClick={() => (isRegisterWithPass ? signUP() : setIsRegisterWithPass(true))}
              className={styles.btn_primary}
              disabled={loading}
            >
              {loading ? "در حال ثبت..." : isRegisterWithPass ? "تکمیل ثبت نام" : "ثبت نام با رمز عبور"}
            </button>
          </div>

          <div className={styles.footer_links}>
            <span>قبلاً ثبت نام کرده‌اید؟</span>
            <button onClick={showloginForm} className={styles.btn_switch}>وارد شوید</button>
          </div>
        </div>
      </div>
      <Link href={"/"}>
      <p className={styles.cancel_text}>لغو و بازگشت</p>
      </Link>
    </div>
  ) : (
    <Sms hideOtpForm={hideOtpForm} />
  );
};

export default Register;