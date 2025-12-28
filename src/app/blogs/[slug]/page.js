import React from "react";
import connectToDB from "@/configs/db";
import BlogModel from "@/models/Blogs";
import styles from "./blogPage.module.css";

const BlogPage = async ({ params }) => {
  const { slug } = params;

  await connectToDB(); // اتصال به MongoDB

  const blog = await BlogModel.findOne({ slug }).lean().populate();

  if (!blog) return <h1 className={styles.title}>این بلاگ یافت نشد</h1>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{blog.title}</h1>
      <p className={styles.meta}>
        نویسنده: {blog.author} | تاریخ: {new Date(blog.date).toLocaleDateString()}
      </p>
      {blog.image && <img src={blog.image} alt={blog.title} className={styles.image} />}
      <div className={styles.content}>
        {blog.content}
      </div>
    </div>
  );
};

export default BlogPage;
