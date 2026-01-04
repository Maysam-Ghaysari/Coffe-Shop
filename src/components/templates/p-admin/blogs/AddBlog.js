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

    if (tags) {
      tags.split("،").forEach((tag) => formData.append("tags", tag.trim()));
    }

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
        router.push("/p-admin/blogs"); 
      });
    }
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>افزودن بلاگ جدید</h2>

      <div className={styles.form_wrapper}>
        <div className={styles.form_group}>
          <label className={styles.label}>عنوان بلاگ</label>
          <input className={styles.input_field} value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="عنوان اصلی..." />
        </div>

        <div className={styles.form_group}>
          <label className={styles.label}>Slug (لینک یکتا)</label>
          <input className={styles.input_field} value={slug} onChange={(e) => setSlug(e.target.value)} type="text" placeholder="blog-slug-here" />
        </div>

        <div className={styles.form_group}>
          <label className={styles.label}>زیرعنوان</label>
          <input className={styles.input_field} value={mainTitle} onChange={(e) => setMainTitle(e.target.value)} type="text" />
        </div>

        <div className={styles.form_group}>
          <label className={styles.label}>نویسنده</label>
          <input className={styles.input_field} value={author} onChange={(e) => setAuthor(e.target.value)} type="text" />
        </div>

        {/* فیلد تمام‌عرض */}
        <div className={`${styles.form_group} ${styles.full_width}`}>
          <label className={styles.label}>خلاصه بلاگ</label>
          <input className={styles.input_field} value={excerpt} onChange={(e) => setExcerpt(e.target.value)} type="text" />
        </div>

        {/* فیلد تمام‌عرض */}
        <div className={`${styles.form_group} ${styles.full_width}`}>
          <label className={styles.label}>متن کامل بلاگ</label>
          <textarea 
            className={`${styles.input_field} ${styles.text_area}`} 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            rows={8}
          ></textarea>
        </div>

        <div className={styles.form_group}>
          <label className={styles.label}>تگ‌ها (با ، جدا کنید)</label>
          <input className={styles.input_field} value={tags} onChange={(e) => setTags(e.target.value)} type="text" placeholder="قهوه، آموزش، بلاگ" />
        </div>

        <div className={styles.form_group}>
          <label className={styles.label}>تصویر اصلی بلاگ</label>
          <input className={styles.input_field} onChange={(e) => setImage(e.target.files[0])} type="file" />
        </div>
      </div>

      <button className={styles.btn_submit} onClick={BlogAdd}>ثبت و انتشار بلاگ</button>
    </section>
  );
}