"use client";
import React from "react";
import styles from "./card.module.css";
import Link from "next/link";
import { FaRegStar } from "react-icons/fa";
import { IoMdStar } from "react-icons/io";
import swal from "sweetalert";

const Card = ({ price, score, name, img, productID }) => {
  const removeProduct = () => {
    swal({
      title: "آیا از حذف محصول اطمینان دارید؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then(async (result) => {
      if (result) {
        const res = await fetch(`/api/wishlist/${productID}`, {
          method: "DELETE",
        });

        if (res.status === 200) {
          swal({
            title: "محصول با موفقیت از علاقه‌مندی‌ها حذف شد",
            icon: "success",
            buttons: "فهمیدم",
          }).then(() => {
            location.reload();
          });
        }
      }
    });
  };

  return (
    <div className={styles.card}>
      <Link href={`/product/${productID}`} className={styles.image_wrapper}>
        <img
          src={img || "/images/no-image.png"} 
          alt={name}
        />
      </Link>
      
      <div className={styles.details}>
        <p className={styles.name} dir="rtl">{name}</p>
        
        <div className={styles.info_row}>
          <div className={styles.stars}>
            {new Array(score).fill(0).map((_, index) => (
              <IoMdStar key={`star-fill-${index}`} />
            ))}
            {new Array(5 - score).fill(0).map((_, index) => (
              <FaRegStar key={`star-empty-${index}`} />
            ))}
          </div>
          <span className={styles.price}>{price?.toLocaleString()} تومان</span>
        </div>
        
        <button onClick={removeProduct} className={styles.delete_btn}>
          حذف محصول
        </button>
      </div>
    </div>
  );
};

export default Card;