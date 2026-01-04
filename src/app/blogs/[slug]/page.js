import React from "react";
import connectToDB from "@/configs/db";
import BlogModel from "@/models/Blogs";
import styles from "./blogPage.module.css";
import Image from "next/image"; // برای بهینه‌سازی عکس
import { FaUserEdit, FaCalendarAlt } from "react-icons/fa"; // افزودن آیکون
import Navbar from "@/components/modules/navbar/Navbar";
import Footer from "@/components/modules/footer/Footer";

const BlogPage = async ({ params }) => {
  const { slug } = params;

  await connectToDB();
  const blog = await BlogModel.findOne({ slug }).lean();

  if (!blog) {
    return (
      <div className={styles.notFound}>
        <h1>این مقاله پیدا نشد!</h1>
      </div>
    );
  }

  return (
    <>
    <Navbar/>
    <article className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>{blog.title}</h1>
        
        <div className={styles.meta}>
          <div className={styles.metaItem}>
            <FaUserEdit />
            <span>نویسنده: {blog.author}</span>
          </div>
          <div className={styles.metaItem}>
            <FaCalendarAlt />
            <span>{new Date(blog.createdAt || blog.date).toLocaleDateString("fa-IR")}</span>
          </div>
        </div>
      </header>

      {blog.image && (
        <div className={styles.imageWrapper}>
          <img 
            src={blog.image} 
            alt={blog.title} 
            className={styles.mainImage} 
          />
        </div>
      )}

      <div className={styles.content}>
        {/* اگر محتوا متن ساده است از {blog.content} استفاده کنید */}
        {/* اگر محتوا HTML است از کد زیر استفاده کنید: */}
        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
      </div>
    </article>
    <Footer/>
    </>

  );
};

export default BlogPage;