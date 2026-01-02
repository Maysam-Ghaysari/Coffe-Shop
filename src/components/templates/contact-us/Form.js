"use client";
import { useState } from "react";
import styles from "./form.module.css";
import { showSwal } from "@/utils/helpers";
import { FaPaperPlane } from "react-icons/fa";

const Form = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const submitMessage = async (event) => {
    event.preventDefault();

    // اعتبارسنجی ساده
    if (!name.trim() || !email.trim() || !message.trim()) {
      return showSwal("لطفاً فیلدهای ستاره‌دار را پر کنید", "error", "تلاش مجدد");
    }

    setLoading(true);
    const contact = { name, email, phone, company, message };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      });

      if (res.status === 201) {
        setEmail("");
        setName("");
        setCompany("");
        setPhone("");
        setMessage("");
        showSwal("پیغام شما با موفقیت ثبت شد", "success", "فهمیدم");
      } else {
        showSwal("خطایی در ارسال رخ داد", "error", "تلاش مجدد");
      }
    } catch (error) {
      showSwal("اتصال برقرار نشد", "error", "تلاش مجدد");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={submitMessage}>
      <span className={styles.badge}>فرم تماس با ما</span>
      <h2 className={styles.title}>منتظر شنیدن نظرات شما هستیم</h2>
      <p className={styles.description}>برای تماس با ما می‌توانید فرم زیر را تکمیل کنید</p>

      <div className={styles.groups}>
        <div className={styles.group}>
          <label>نام و نام خانوادگی <span>*</span></label>
          <input
            type="text"
            placeholder="مثلا: علی محمدی"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.group}>
          <label>آدرس ایمیل <span>*</span></label>
          <input
            type="email"
            placeholder="example@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.groups}>
        <div className={styles.group}>
          <label>شماره تماس</label>
          <input
            type="text"
            placeholder="۰۹۱۲xxxxxxx"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className={styles.group}>
          <label>نام شرکت</label>
          <input
            type="text"
            placeholder="نام مجموعه شما"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.group}>
        <label>درخواست شما <span>*</span></label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="پیام خود را اینجا بنویسید..."
          rows="5"
        ></textarea>
      </div>

      <button type="submit" className={styles.submitBtn} disabled={loading}>
        {loading ? "در حال ارسال..." : (
          <>
            ارسال پیغام
            <FaPaperPlane />
          </>
        )}
      </button>
    </form>
  );
};

export default Form;