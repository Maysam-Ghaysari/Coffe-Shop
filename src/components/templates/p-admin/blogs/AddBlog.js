"use client";
import React, { useState } from "react";
import styles from "./addBlog.module.css";
import swal from "sweetalert";
import { useRouter } from "next/navigation";

export default function AddBlog() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [mainTitle, setMainTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState(null);

  const BlogAdd = async () => {
    if (!title || !slug || !excerpt || !content) {
      swal({
        title: "خطا",
        text: "تمام فیلدهای ضروری را پر کن.",
        icon: "error",
        buttons: "باشه",
      });
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("mainTitle", mainTitle);
    formData.append("excerpt", excerpt);
    formData.append("content", content);
    formData.append("author", author);

    tags.split("،").forEach((tag) => formData.append("tags", tag.trim()));

    if (image) {
      formData.append("image", image);
    }

    const res = await fetch("/api/blogs", {
      method: "POST",
      body: formData,
    });

    if (res.status === 201) {
      swal({
        title: "بلاگ با موفقیت ایجاد شد",
        icon: "success",
        buttons: "باشه",
      }).then(() => {
        router.push("/blogs"); // رفتن به صفحه بلاگ‌ها
      });
    } else {
      swal({
        title: "خطا",
        text: "مشکلی در ذخیره بلاگ پیش آمد.",
        icon: "error",
        buttons: "باشه",
      });
    }
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>افزودن بلاگ جدید</h2>

      <div className={styles.form}>
        <div>
          <label className={styles.label}>عنوان بلاگ</label>
          <input  className={styles.input} value={title} onChange={(e) => setTitle(e.target.value)} type="text" />
        </div>

        <div>
          <label className={styles.label}>Slug</label>
          <input  className={styles.input} value={slug} onChange={(e) => setSlug(e.target.value)} type="text" />
        </div>

        <div>
          <label className={styles.label}>زیرعنوان</label>
          <input className={styles.input}  value={mainTitle} onChange={(e) => setMainTitle(e.target.value)} type="text" />
        </div>

        <div>
          <label className={styles.label}>خلاصه</label>
          <input className={styles.input}  value={excerpt} onChange={(e) => setExcerpt(e.target.value)} type="text" />
        </div>

        <div>
          <label className={styles.label}>متن کامل</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={6}></textarea>
        </div>

        <div>
          <label className={styles.label}>نویسنده</label>
          <input className={styles.input}  value={author} onChange={(e) => setAuthor(e.target.value)} type="text" />
        </div>

        <div>
          <label className={styles.label}>تگ‌ها</label>
          <input className={styles.input}  value={tags} onChange={(e) => setTags(e.target.value)} type="text" />
        </div>

        <div>
          <label className={styles.label}>تصویر</label>
          <input className={styles.input}  onChange={(e) => setImage(e.target.files[0])} type="file" />
        </div>
      </div>

      <button className={styles.btn} onClick={BlogAdd}>افزودن بلاگ</button>
    </section>
  );
}
