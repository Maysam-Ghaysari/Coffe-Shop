import React, { useState } from "react";
import styles from "./login.module.css";
import Link from "next/link";
import Sms from "./Sms";
import { showSwal } from "@/utils/helpers";
import { valiadteEmail, valiadtePassword } from "@/utils/auth";

const Login = ({ showRegisterForm }) => {
  const [isLoginWithOtp, setIsLoginWithOtp] = useState(false);
  const [password, setPassword] = useState("");
  const [phoneOrEmail, setPhoneOrEmail] = useState("");

  const hideOtpForm = () => setIsLoginWithOtp(false);

  const loginWithPassword = async () => {
    console.log(phoneOrEmail);
    if (!phoneOrEmail) {
      return showSwal("لطفا شماره تماس یا ایمیل را وارد کنید", "error", "چشم");
    }

    const isValidEmail = valiadteEmail(phoneOrEmail);
    if (!isValidEmail) {
      return showSwal("ایمیل وارد شده صحیح نیست", "error", "تلاش مجدد");
    }

    if (!password) {
      return showSwal("پسورد را وارد کنید", "error", "تلاش مجدد");
    }

    const isValidPassword = valiadtePassword(password);
    if (!isValidPassword) {
      return showSwal("پسورد به اندازه کافی قوی نیست", "error", "تلاش مجدد");
    }

    const user = { email: phoneOrEmail, password };

    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    const data = await res.json();

    console.log("Res ->", res);
    if (res.status === 200) {
      swal("با موفقیت لاگین شدین", " ok", "ورود به پنل کاربری").then(
        (result) => {
          location.replace("/p-user");
        }
      );
    } else if (res.status === 422 || res.status === 401) {
      showSwal("کاربری با این اطلاعات یافت نشد", "error", "تلاش مجدد");
    } else if (res.status === 419) {
      showSwal("ایمیل یا پسورد صحیح نیست", "error", "تلاش مجدد");
    }
  };

  return (
    <>
      {!isLoginWithOtp ? (
        <>
          <div className={styles.form_container}>
            <div className={styles.form}>
              {/* ایمیل / موبایل */}
              <div className={styles.input_group}>
                <input
                  className={styles.input}
                  type="text"
                  value={phoneOrEmail}
                  onChange={(event) => setPhoneOrEmail(event.target.value)}
                  placeholder=" "
                  required
                />
                <label className={styles.input_label}>
                  ایمیل / شماره موبایل
                </label>
              </div>

              {/* رمز عبور */}
              <div className={styles.input_group}>
                <input
                  className={styles.input}
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder=" "
                  required
                />
                <label className={styles.input_label}>رمز عبور</label>
              </div>

              {/* چک‌باکس */}
              <div className={styles.checkbox}>
                <input type="checkbox" id="rememberMe" />
                <p>مرا به یاد داشته باش</p>
              </div>

              {/* دکمه‌ها */}
              <button className={styles.btn} onClick={loginWithPassword}>
                ورود
              </button>
              <Link href={"/forget-password"} className={styles.forgot_pass}>
                رمز عبور را فراموش کرده‌اید؟
              </Link>

              <button
                onClick={() => setIsLoginWithOtp(true)}
                className={styles.btn}
              >
                ورود با کد یکبار مصرف
              </button>

              <span>آیا حساب کاربری ندارید؟</span>
              <button onClick={showRegisterForm} className={styles.btn_light}>
                ثبت نام
              </button>
            </div>

            <Link href={"/"} className={styles.redirect_to_home}>
              لغو
            </Link>
          </div>
        </>
      ) : (
        <Sms hideOtpForm={hideOtpForm} />
      )}
    </>
  );
};

export default Login;
