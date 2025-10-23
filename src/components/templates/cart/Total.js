"use client "
import { useEffect, useState } from "react";
import totalStyles from "./totals.module.css";
import Link from "next/link";
import Select from "react-select";
import stateData from "@/utils/stateData";
 
const stateOptions = stateData();

 const Total = () => {
  const [stateSelectedOption, setStateSelectedOption] = useState(null);
  const [changeAddress, setChangeAddress] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cart, setCart] = useState([]);


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
  return (
 <div className={totalStyles.totals}>
        <p className={totalStyles.totals_title}>جمع کل سبد خرید</p>

        <div className={totalStyles.subtotal}>
          <p>جمع جزء </p>
     <p>{totalPrice.toLocaleString()} تومان</p>
        </div>

        <p className={totalStyles.motor}>
        </p>
        <div className={totalStyles.address}>
          <p>حمل و نقل </p>
          <span>حمل و نقل به تهران (فقط شهر تهران).</span>
        </div>
        <p
          onClick={() => setChangeAddress((prev) => !prev)}
          className={totalStyles.change_address}
        >
          تغییر آدرس
        </p>
        {changeAddress && (
          <div className={totalStyles.address_details}>
            <Select
              defaultValue={stateSelectedOption}
              onChange={setStateSelectedOption}
              isClearable={true}
              placeholder={"استان"}
              isRtl={true}
              isSearchable={true}
              options={stateOptions}
            />
            <input type="text" placeholder="شهر" />
            <input type="number" placeholder="کد پستی" />
            <button onClick={() => setChangeAddress(false)}>بروزرسانی</button>
          </div>
        )}

        <div className={totalStyles.total}>
          <p>مجموع</p>
          <p>{totalPrice.toLocaleString()} تومان</p>
        </div>

        <Link href={"/checkout"}>
          <button className={totalStyles.checkout_btn}>
            ادامه جهت تصویه حساب
          </button>
        </Link>
      </div>
  )}
export default Total;
