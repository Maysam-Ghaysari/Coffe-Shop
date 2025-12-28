"use client";
import Link from "next/link";
import styles from "./table.module.css";
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import { showSwal } from "@/utils/helpers";
import Total from "./Total";

const Table = ({ product }) => { // product prop برای عکس‌ها استفاده می‌شود
  const [cart, setCart] = useState([]);
  const [discount, setDiscount] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const localCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(localCart);
  }, []);

  useEffect(() => {
    if (cart.length) {
      const price = cart.reduce(
        (prev, current) => prev + current.price * current.count,
        0
      );
      setTotalPrice(price);
    } else {
      setTotalPrice(0);
    }
  }, [cart]);

  const changeQuantity = (id, amount) => {
    const newCart = cart.map((item) => {
      if (item.id === id) {
        const newCount = item.count + amount;
        return { ...item, count: newCount > 0 ? newCount : 1 };
      }
      return item;
    });
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const removeProduct = (productID) => {
    const newCart = cart.filter((item) => item.id !== productID);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    showSwal("محصول حذف شد", "success", "فهمیدم");
  };

  const checkDiscount = async () => {
    if (!discount.trim()) return showSwal("کد را وارد کنید", "error", "باشه");
    const res = await fetch("/api/discounts/use", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: discount }),
    });
    // ... (منطق چک کردن تخفیف که قبلاً داشتید)
    if (res.status === 200) {
       // لاجیک موفقیت
       showSwal("کد اعمال شد", "success", "باشه");
    }
  };

  if (cart.length === 0) {
    return <div className={styles.empty_cart}>سبد خرید خالی است</div>;
  }

  return (
    <div className={styles.main_wrapper}>
      <div className={styles.cart_container}>
        
        {/* هدر جدول - فقط در دسکتاپ نمایش داده می‌شود */}
        <div className={styles.cart_header}>
          <div className={styles.col_product}>محصول</div>
          <div className={styles.col_count}>تعداد</div>
          <div className={styles.col_total}>جمع جزء</div>
          <div className={styles.col_action}>حدف</div>
        </div>

        {/* لیست آیتم‌ها */}
        <div className={styles.cart_items_list}>
          {cart.map((item) => (
            <div className={styles.cart_item} key={item.id}>
              
              {/* بخش محصول (عکس و نام) */}
              <div className={styles.col_product}>
                <div className={styles.product_meta}>
                  <img
                    src={item.img || "https://set-coffee.com/wp-content/uploads/2020/12/Red-box-DG--430x430.jpg"}
                    alt={item.name}
                  />
                  <Link href={`/product/${item.id}`}>{item.name}</Link>
                </div>
              </div>

             

              {/* تعداد */}
              <div className={styles.col_count} data-label="تعداد">
                <div className={styles.counter_box}>
                  <button onClick={() => changeQuantity(item.id, 1)}>+</button>
                  <span>{item.count}</span>
                  <button onClick={() => changeQuantity(item.id, -1)}>-</button>
                </div>
              </div>

              {/* جمع جزء */}
              <div className={styles.col_total} data-label="جمع جزء">
                <span>{(item.count * item.price).toLocaleString()}</span> <small>تومان</small>
              </div>

              {/* دکمه حذف */}
              <div className={styles.col_action}>
                <IoMdClose onClick={() => removeProduct(item.id)} />
              </div>
            </div>
          ))}
        </div>

        {/* بخش کوپن تخفیف */}
        <div className={styles.coupon_box}>
          <input
            type="text"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            placeholder="کد تخفیف"
          />
          <button onClick={checkDiscount}>اعمال</button>
        </div>
      </div>

      {/* کامپوننت توتال */}
      <Total totalPrice={totalPrice} />
    </div>
  );
};

export default Table;