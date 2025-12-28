"use client";
import React from "react";
import styles from "./blogtable.module.css";
import { useRouter } from "next/navigation";
import swal from "sweetalert";
import { showSwal } from "@/utils/helpers";

export default function BlogTable({ blogs, title,_id }) {
  const router = useRouter();
  const showBlogMainTitle = (body) => {
    showSwal(body, undefined, "خوندم");
  };
const removeBlog = async (_id) => {
    // Confirm ✅
    // Validation (You) ✅

    swal({
      title: "آیا از حذف بلاگ اطمینان دارین؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then(async (result) => {
      if (result) {
        const res = await fetch("/api/blogs/delete", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: _id }),
        });

        if (res.status === 200) {
          swal({
            title: "بلاگ مورد نظر با موفقیت حذف شد",
            icon: "success",
            buttons: "فهمیدم",
          }).then(() => {
            router.refresh();
          });
        }
      }
    });
  };
  return (
    <div>
      <div>
        <h1 className={styles.title}>
          <span>{title}</span>
        </h1>
      </div>

      <div className={styles.table_container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>شناسه</th>
              <th>عنوان</th>
              <th>نویسنده</th>
              <th>slug</th>
              <th>خلاصه</th>
              <th>جزئیات</th>
              <th>ویرایش</th>
              <th>حذف</th>
            </tr>
          </thead>

          <tbody>
            {blogs.map((blog, index) => (
              <tr key={blog._id}>
                <td>{index + 1}</td>
                <td>{blog.title}</td>
                <td>{blog.author}</td>
                <td>{blog.slug}</td>

                <td>
                  {blog.excerpt
                    ? blog.excerpt.slice(0, 40) + "..."
                    : "—"}
                </td>

                <td>
                  <button
                    type="button"
                    className={styles.edit_btn}
                    onClick={() => showBlogMainTitle(blog.mainTitle)}
                  >
                    مشاهده
                  </button>
                </td>

                <td>
                  <button
                    type="button"
                    className={styles.edit_btn}
                    onClick={() =>
                      router.push(`/p-admin/blogs/edit/${blog.slug}`)
                    }
                  >
                    ویرایش
                  </button>
                </td>

                <td>
                 <button
                    type="button"
                    className={styles.delete_btn}
                    onClick={() => removeBlog(blog._id)}
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
