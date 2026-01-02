"use client";
import styles from "@/styles/login-register.module.css";
import { useState } from "react";
import { authTypes } from "@/utils/constants";
import Login from "@/components/templates/login-register/Login";
import Register from "@/components/templates/login-register/Register";

const login_register = () => {
  const [authType, setAuthType] = useState(authTypes.LOGIN);

  const showRegisterForm = () => setAuthType(authTypes.REGISTER);
  const showloginForm = () => setAuthType(authTypes.LOGIN);

  return (
    <div className={styles.login_register_container}>
      <div className={styles.auth_box} data-aos="fade-up">
        
        {/* بخش فرم‌ها (سمت راست در حالت RTL) */}
        <div className={styles.form_section}>
          {authType === authTypes.LOGIN ? (
            <Login showRegisterForm={showRegisterForm} />
          ) : (
            <Register showloginForm={showloginForm} />
          )}
        </div>

        {/* بخش تصویر (سمت چپ در حالت RTL) */}
        <div className={styles.image_section}>
          <div className={styles.image_overlay}>
            <h2>قهوه سِت</h2>
            <p>لذت نوشیدن یک فنجان اصالت</p>
          </div>
          <img 
            src="/images/Banner/b3.jpg" 
            alt="Coffee" 
            className={styles.auth_img}
          />
        </div>

      </div>
    </div>
  );
};

export default login_register;