"use client";
import { IoMdStar } from "react-icons/io";
import styles from "./commentForm.module.css";
import { useEffect, useState } from "react";
import { showSwal } from "@/utils/helpers";
import { valiadteEmail } from "@/utils/auth";

const CommentForm = ({ productID, userID }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  const [score, setScore] = useState(5);
  const [isSaveUserInfo, setIsSaveUserInfo] = useState(false);

  useEffect(() => {
    const savedUserInfo = localStorage.getItem("userInfo");
    if (savedUserInfo) {
      const userInfo = JSON.parse(savedUserInfo);
      setUsername(userInfo?.username || "");
      setEmail(userInfo?.email || "");
      setIsSaveUserInfo(true);
    }
  }, []);

  const submitComment = async () => {
    if (!username.trim() || !email.trim() || !body.trim()) {
      return showSwal("لطفا تمام فیلد‌های ستاره‌دار را پر کنید", "error", "فهمیدم");
    }

    if (!valiadteEmail(email)) {
      return showSwal("ایمیل وارد شده معتبر نیست", "error", "فهمیدم");
    }

    if (isSaveUserInfo) {
      localStorage.setItem("userInfo", JSON.stringify({ username, email }));
    } else {
      localStorage.removeItem("userInfo");
    }

    const comment = {
      username,
      email,
      body,
      score,
      productID,
      user: userID?._id || userID, // اطمینان از ارسال درست ID
    };

    const res = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(comment),
    });

    if (res.ok) {
      showSwal("دیدگاه شما پس از تایید مدیریت نمایش داده خواهد شد", "success", "فهمیدم");
      setBody(""); // خالی کردن متن نظر پس از ارسال
    } else {
      showSwal("خطایی در ثبت نظر رخ داد", "error", "تلاش مجدد");
    }
  };

  return (
    <div className={styles.form}>
      <p className={styles.title}>دیدگاه خود را بنویسید</p>
      <p className={styles.subtitle}>
        نشانی ایمیل شما منتشر نخواهد شد. بخش‌های موردنیاز علامت‌گذاری شده‌اند{" "}
        <span className={styles.required}>*</span>
      </p>

      <div className={styles.rate_section}>
        <p>امتیاز شما :</p>
        <div className={styles.stars}>
          {[5, 4, 3, 2, 1].map((num) => (
            <IoMdStar
              key={num}
              onClick={() => setScore(num)}
              className={score >= num ? styles.active_star : styles.gray_star}
            />
          ))}
        </div>
      </div>

      <div className={styles.group}>
        <label>دیدگاه شما <span className={styles.required}>*</span></label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows="6"
          placeholder="نظرتان را اینجا بنویسید..."
        ></textarea>
      </div>

      <div className={styles.input_row}>
        <div className={styles.group}>
          <label>نام <span className={styles.required}>*</span></label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
          />
        </div>
        <div className={styles.group}>
          <label>ایمیل <span className={styles.required}>*</span></label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
        </div>
      </div>

      <div className={styles.checkbox_wrapper}>
        <input
          type="checkbox"
          id="save-info"
          checked={isSaveUserInfo}
          onChange={() => setIsSaveUserInfo(!isSaveUserInfo)}
        />
        <label htmlFor="save-info">ذخیره نام و ایمیل در مرورگر</label>
      </div>

      <button className={styles.submit_btn} onClick={submitComment}>
        ثبت دیدگاه
      </button>
    </div>
  );
};

export default CommentForm;