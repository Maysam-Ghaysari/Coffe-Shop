"use client";
import Link from "next/link";
import styles from "./table.module.css";
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import { showSwal } from "@/utils/helpers";
import Total from "./Total";


const Table = () => {
  
  const [cart, setCart] = useState([]);
  const [discount, setDiscount] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const localCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(localCart);
  }, []);

  useEffect(calcTotalPrice, [cart]);

  function calcTotalPrice() {
    let price = 0;

    if (cart.length) {
      price = cart.reduce(
        (prev, current) => prev + current.price * current.count,
        0
      );
      setTotalPrice(price);
    }

    setTotalPrice(price);
  }

    const removeProduct = (productID) => {
    const newCart = cart.filter(item => item.id !== productID);

    setCart(newCart);

    localStorage.setItem('cart', JSON.stringify(newCart));

     swal({
        title: "محصول مورد نظر با موفقیت حذف شد",
        icon: "success",
        buttons: "فهمیدم",
      }).then(() => {
           window.location.reload();
      });

    
  };

  const checkDiscount = async () => {
    // Validation (You) ✅

    const res = await fetch("api/discounts/use", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: discount }),
    });


    if (res.status === 404) {
      return showSwal("کد تخفیف وارد شده معتبر نیست", "error", "تلاش مجدد");
    } else if (res.status === 422) {
      return showSwal("کد تخفیف وارد شده منقضی شده", "error", "تلاش مجدد");
    } else if (res.status === 200) {
      const discountCode = await res.json();
      const newPrice = totalPrice - (totalPrice * discountCode.percent) / 100;
      setTotalPrice(newPrice);
      return showSwal("کد تخفیف با موفقیت اعمال شد", "success", "فهمیدم");
    }
  };

  return (
    <>
      <div className={styles.cart_layout}>

      <div className={styles.tabel_container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th> جمع جزء</th>
              <th>تعداد</th>
              <th>قیمت</th>
              <th>محصول</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td data-label="جمع جزء">{(item.count * item.price).toLocaleString()} تومان</td>
                <td data-label="تعداد" className={styles.counter}>
                  <div>
                    <span>-</span>
                    <p>{item.count}</p>
                    <span>+</span>
                  </div>
                </td>
                <td data-label="قیمت" className={styles.price}>
                  {item.price.toLocaleString()} تومان
                </td>
                <td className={styles.product}>
                  <img
                    src="https://set-coffee.com/wp-content/uploads/2020/12/Red-box-DG--430x430.jpg"
                    alt=""
                  />
                  <Link href={"/"}>{item.name}</Link>
                </td>

               <td data-label="حذف">
  <IoMdClose
    className={styles.delete_icon}
    onClick={() => removeProduct(item.id)}
  />
</td>
              </tr>
            ))}
          </tbody>
        </table>
        <section>
          <button className={styles.update_btn}> بروزرسانی سبد خرید</button>
          <div>
            <button className={styles.set_off_btn} onClick={checkDiscount}>
              اعمال کوپن
            </button>
            <input
              type="text"
              value={discount}
              onChange={(event) => setDiscount(event.target.value)}
              placeholder="کد تخفیف"
            />
          </div>
        </section>
      </div>
     <Total/>
      </div>
    </>
  );
};

export default Table;

