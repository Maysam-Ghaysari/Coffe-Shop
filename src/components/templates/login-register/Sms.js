"use client";
import { useState, useEffect } from "react";
import styles from "./sms.module.css";

const Sms = ({ hideOtpForm, phoneNumber = "09381234567" }) => {
  const [timer, setTimer] = useState(60); // تایمر ۶۰ ثانیه‌ای

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  return (
    <div className={styles.sms_wrapper} data-aos="zoom-in">
      <div className={styles.header}>
        <h2 className={styles.title}>تأیید شماره موبایل</h2>
        <p className={styles.subtitle}>
          کد ۵ رقمی ارسال شده به شماره زیر را وارد کنید:
        </p>
        <div className={styles.phone_display}>
          <span>{phoneNumber}</span>
          <button onClick={hideOtpForm} className={styles.edit_btn}>ویرایش شماره</button>
        </div>
      </div>

      <div className={styles.input_container}>
        <input 
          className={styles.otp_input} 
          type="text" 
          maxLength="5" 
          placeholder="- - - - -"
          autoFocus
        />
      </div>

      <button className={styles.btn_submit}>
        تأیید و ادامه
      </button>

      <div className={styles.footer}>
        {timer > 0 ? (
          <p className={styles.timer_text}>
            ارسال مجدد کد تا <span>{timer}</span> ثانیه دیگر
          </p>
        ) : (
          <button className={styles.resend_btn}>ارسال مجدد کد</button>
        )}
      </div>

      <button onClick={hideOtpForm} className={styles.back_btn}>
        بازگشت به مرحله قبل
      </button>
    </div>
  );
};

export default Sms;