import { useState } from "react";
import styles from "./register.module.css";
import Sms from "./Sms";
import { showSwal } from "@/utils/helpers";
import {
  valiadteEmail,
  validateName,
  valiadtePassword,
  validatePhone,
} from "@/utils/auth";

const Register = ({ showloginForm }) => {
  const [isRegisterWithPass, setIsRegisterWithPass] = useState(false);
  const [isRegisterWithOtp, setIsRegisterWithOtp] = useState(false);
  const hideOtpForm = () => setIsRegisterWithOtp(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const signUP = async () => {
    // validation
    const isValidatName = validateName(name);
    if (!isValidatName) {
      return showSwal("نام وارد شده اشتباه است", "error", "فهمیدم");
    }
    const isValidatephone = validatePhone(phone);
    if (!isValidatephone) {
      return showSwal("شماره وارد شده صحیح نمیباشد.", "error", "فهمیدم");
    }
    if (email) {
      const isValidateEmail = valiadteEmail(email);
      if (!isValidateEmail) {
        return showSwal("ایمیل را به درستی وارد کنید", "error", "فهمیدم");
      }
    }

    const isValidatePassword = valiadtePassword(password);
    if (!isValidatePassword) {
      return showSwal("رمز قابل حدس است", "error", "فهمیدم");
    }

    const user = { name, email, password, phone };
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    console.log(res);
    if (res.status === 422) {
      showSwal("کاربری با این مشخصات از قبل وجود دارد", "error", "متوجه شدم");
    } else if (res.status === 201) {
      showSwal("ثبت نام با موفقیت انجام شد", "success", "ورود به پنل کاربری");
    }

    setEmail("");
    setName("");
    setPassword("");
    setPhone("");
  };

  return !isRegisterWithOtp ? (
    <>
      <div className={styles.form_container}>
        <div className={styles.form}>
          {/* نام */}
          <div className={styles.input_group}>
            <input
              className={styles.input}
              value={name}
              onChange={(event) => setName(event.target.value)}
              type="text"
              required
              placeholder=""
            />
            <label className={styles.floating_label}> نام کاربری</label>
          </div>

          {/* شماره موبایل */}
          <div className={styles.input_group}>
            <input
              className={styles.input}
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              type="text"
              required
              placeholder=""
            />
            <label className={styles.floating_label}>شماره موبایل</label>
          </div>

          {/* ایمیل */}
          <div className={styles.input_group}>
            <input
              className={styles.input}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              placeholder=""
            />
            <label className={styles.floating_label}>ایمیل (دلخواه)</label>
          </div>

          {/* رمز عبور */}
          {isRegisterWithPass && (
            <div className={styles.input_group}>
              <input
                className={styles.input}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                required
                placeholder=""
              />
              <label className={styles.floating_label}>رمز عبور</label>
            </div>
          )}

          {/* ثبت نام با کد تایید */}
          <button
            onClick={() => setIsRegisterWithOtp(true)}
            className={styles.btn}
          >
            ثبت نام با کد تایید
          </button>

          {/* ثبت نام با رمز عبور */}
          <button
            onClick={() => {
              if (isRegisterWithPass) {
                signUP();
              } else {
                setIsRegisterWithPass(true);
              }
            }}
            className={styles.btn}
          >
            ثبت نام با رمز عبور
          </button>

          {/* برگشت به ورود */}
          <p onClick={showloginForm} className={styles.back_to_login}>
            برگشت به ورود
          </p>
        </div>

        {/* دکمه لغو */}
        <p className={styles.redirect_to_home}>لغو</p>
      </div>
    </>
  ) : (
    <Sms hideOtpForm={hideOtpForm} />
  );
};

export default Register;
