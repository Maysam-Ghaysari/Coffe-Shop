"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { TbShoppingCartX } from "react-icons/tb";
import Table from "@/components/templates/cart/Table";
import styles from "./cartcontent.module.css";

const CartContent = () => {
 
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  return (
    <>
      {cartItems.length > 0 ? (
        <main className={styles.cart} data-aos="fade-up">
          {/* پاس دادن setCartItems به Table */}
          <Table cartItems={cartItems} setCartItems={setCartItems}  />
        </main>
      ) : (
        <div className={styles.cart_empty} data-aos="fade-up">
          <TbShoppingCartX size={60} />
          <p>سبد خرید شما در حال حاضر خالی است. </p>
          <span>
            قبل از تسویه حساب، باید چند محصول را به سبد خرید خود اضافه کنید.
          </span>
          <span>در صفحه "فروشگاه"، محصولات جالب زیادی خواهید یافت.</span>
          <div>
            <Link href="/">بازگشت به فروشگاه</Link>
          </div>
        </div>
      )}
    </>
  );
};

export default CartContent;
