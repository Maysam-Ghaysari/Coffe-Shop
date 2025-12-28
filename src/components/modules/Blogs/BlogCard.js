import React from "react";
import styles from "./blogCard.module.css";
import Link from "next/link";

export default function BlogCard({ blogs }) {
  return (
    <section className={styles.wrapper}>
 

      <div className={styles.container}>
        {blogs.map((blog) => (
          <article key={blog._id} className={styles.card}>
            <div className={styles.imageWrapper}>
              <img
                src={blog.image || "/images/blogs/blog-image.jpg"}
                alt={blog.title}
                className={styles.image}
              />
            </div>

            <div className={styles.content}>
              <h2 className={styles.title}>{blog.title}</h2>

              <p className={styles.text}>
                {blog.excerpt || "این مقاله توضیحات کوتاه ندارد."}
              </p>

              <Link href={`/blogs/${blog.slug}`} className={styles.link}>
                ادامه مطلب
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
