"use client";
import { showSwal } from "@/utils/helpers";
import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa"; // برای نمایش حالت پر شده در صورت تمایل
import styles from "./addwishlist.module.css"; // استفاده از استایل مشترک بخش جزئیات

function AddToWishlist({ productID }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const authUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (res.status === 200) {
          const data = await res.json();
          setUser(data);
        }
      } catch (err) {
        console.error("Auth error:", err);
      }
    };
    authUser();
  }, []);

  const addToWishlist = async (event) => {
    event.preventDefault();
    
    if (!user?._id) {
      return showSwal(
        "برای اضافه کردن به علاقه‌مندی‌ها ابتدا وارد حساب کاربری شوید",
        "error",
        "فهمیدم"
      );
    }

    setLoading(true);
    try {
      const wish = {
        user: user._id,
        product: productID,
      };

      const res = await fetch("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(wish),
      });

      if (res.status === 421) {
        showSwal("این محصول از قبل در لیست شما وجود دارد", "warning", "متوجه شدم");
      } else if (res.status === 201) {
        showSwal("محصول به لیست علاقه‌مندی‌ها اضافه شد", "success", "عالی");
      }
    } catch (error) {
      showSwal("خطایی رخ داد، دوباره تلاش کنید", "error", "اوکی");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      onClick={!loading ? addToWishlist : null} 
      className={styles.wishlist_btn_container}
      style={{ cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.6 : 1 }}
    >
      <CiHeart className={styles.wishlist_icon} />
      <span className={styles.wishlist_text}>
        {loading ? "در حال ثبت..." : "افزودن به علاقه‌مندی‌ها"}
      </span>
    </div>
  );
}

export default AddToWishlist;