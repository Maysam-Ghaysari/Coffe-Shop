"use client";
import Link from "next/link";
import { showSwal } from "@/utils/helpers";
import React, { useEffect, useState } from "react";
import styles from "./product.module.css";
import { FaRegStar, FaStar } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";

const Card = ({ name, price, img,score,_id }) => {
const safeScore = Math.max(0, Math.min(5, Number(score) || 0));
 const [user, setUser] = useState({});

  useEffect(() => {
    const authUser = async () => {
      const res = await fetch("/api/auth/me");
      console.log(res);
      if (res.status === 200) {
        const data = await res.json();
        console.log(data);
        setUser({ ...data });
      }
    };

    authUser();
  }, []);

  const addToWishlist = async (event) => {
    event.preventDefault();
    if (!user?._id) {
      return showSwal(
        "برای اضافه کردن به علاقه مندی‌ها لطفا ابتدا لاگین بکنین",
        "error",
        "فهمیدم"
      );
    }

    const wish = {
      user: user._id,
      product: _id,
    };

    const res = await fetch("/api/wishlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(wish),
    });

    console.log("Response ->", res);
    if (res.status === 421) {
      return showSwal(
        "محصول از قبل در لیست علاقه مندی وجود دارد",
        "error",
        "ok"
      );
    }
    

    if (res.status === 201) {
      showSwal("محصول مورد نظر به علاقه‌مندی‌ها اضافه شد", "success", "فهمیدم");
    }
  };

  return (
    <div className={styles.card}>
          <Link href={`/product/${_id}`}>
      
      <div className={styles.details_container}>
        <img
          src={
            img  
          }
          alt="عکس محصول"
        />
        <div className={styles.icons}>
          
          <div onClick={addToWishlist}>
            <CiHeart />
            <p  className={styles.tooltip}>افزودن به علاقه مندی ها </p>
          </div>
        </div>
        <button>مشاهده محصول</button>
      </div>
   </Link>
      <div className={styles.details}>
        <Link href={`product/${_id}`}>{name}</Link>
         <div>
      {[...Array(safeScore)].map((_, index) => (
  <FaStar key={index} />
))}

{[...Array(5 - safeScore)].map((_, index) => (
  <FaRegStar key={index} />
))}
        </div>
        <span>{price?.toLocaleString()} تومان</span>
      </div>
    </div>
  );
};

export default Card;
