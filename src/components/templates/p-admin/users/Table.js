"use client";
import React from "react";
import styles from "./table.module.css";
import swal from "sweetalert";
import { useRouter } from "next/navigation";

export default function DataTable({ users, title }) {
  const router = useRouter();

  const changeRole = async (userID) => {
    // Confirmation is usually done inside the swal but we'll stick to the current logic
    const res = await fetch("/api/user/role", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: userID }),
    });
    if (res.status === 200) {
      swal({
        title: "نقش کاربر با موفقیت تغییر یافت",
        icon: "success",
        buttons: "فهمیدم",
      }).then(() => {
        router.refresh();
      });
    }
  };

  const removeUser = async (userID) => {
    swal({
      title: "آیا از حذف کاربر اطمینان دارین؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then(async (result) => {
      if (result) {
        const res = await fetch("/api/user/delete", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: userID }),
        });

        if (res.status === 200) {
          swal({
            title: "کاربر مورد نظر با موفقیت حذف شد",
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
              <th>نام و نام خانوادگی</th>
              <th>ایمیل</th>
              <th>نقش</th>
              <th>ویرایش</th>
              <th>تغییر سطح</th>
              <th>حذف</th>
              <th>بن</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
           <tr key={user._id}>
  <td data-label="شناسه">{index + 1}</td>
  <td data-label="نام">{user.name}</td>
  <td data-label="ایمیل" style={{ wordBreak: "break-all" }}>
    {user.email ? user.email : "ایمیل یافت نشد"}
  </td>
  <td data-label="نقش">
    {user.role === "USER" ? (
      <span className={styles.role_user}>کاربر عادی</span>
    ) : (
      <span className={styles.role_admin}>مدیر</span>
    )}
  </td>
  <td data-label="ویرایش">
    <button type="button" className={styles.edit_btn}>ویرایش</button>
  </td>
  <td data-label="تغییر سطح">
    <button
      type="button"
      className={styles.edit_btn}
      onClick={() => changeRole(user._id)}
    >
      {user.role === "USER" ? "ارتقا به مدیر" : "تنزل به کاربر"}
    </button>
  </td>
  <td data-label="حذف">
    <button
      type="button"
      className={styles.delete_btn}
      onClick={() => removeUser(user._id)}
    >
      حذف
    </button>
  </td>
  <td data-label="بن">
    <button type="button" className={styles.delete_btn}>بن</button>
  </td>
</tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}