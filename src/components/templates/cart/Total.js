"use client";
import { useState } from "react";
import totalStyles from "./totals.module.css";
import Link from "next/link";
import Select from "react-select";
import stateData from "@/utils/stateData";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const stateOptions = stateData();

// استایل‌های کاستوم برای React Select تا با CSS ماژول ما هماهنگ شود
const customSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "#fff",
    borderColor: state.isFocused ? "#333" : "#e0e0e0",
    borderRadius: "8px",
    padding: "4px",
    boxShadow: state.isFocused ? "0 0 0 1px #333" : null,
    "&:hover": {
      borderColor: "#333",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#333" : "#fff",
    color: state.isSelected ? "#fff" : "#333",
    "&:hover": {
      backgroundColor: "#f0f0f0",
      color: "#333",
    },
  }),
};

const Total = ({ totalPrice }) => {
  const [stateSelectedOption, setStateSelectedOption] = useState(null);
  const [changeAddress, setChangeAddress] = useState(false);

  // هزینه حمل و نقل (مثلاً ۵۰ هزار تومان یا محاسبه داینامیک)
  const shippingCost = 50000; 
  
  // اگر قیمت کل صفر بود، جمع نهایی هم صفر باشد، وگرنه جمع با هزینه ارسال
  const finalPrice = totalPrice > 0 ? totalPrice + shippingCost : 0;

  return (
    <div className={totalStyles.totals_card}>
      <h3 className={totalStyles.totals_title}>جمع کل سبد خرید</h3>

      <div className={totalStyles.summary_row}>
        <span>جمع جزء</span>
        <span className={totalStyles.price_text}>{totalPrice.toLocaleString()} تومان</span>
      </div>

      <div className={totalStyles.shipping_section}>
        <div className={totalStyles.summary_row}>
          <span>حمل و نقل</span>
          <span className={totalStyles.shipping_price}>
            {totalPrice > 0 ? `${shippingCost.toLocaleString()} تومان` : "محاسبه نشده"}
          </span>
        </div>
        
        <p className={totalStyles.shipping_desc}>
           ارسال به تهران (پیک موتوری)
        </p>

        <div
          onClick={() => setChangeAddress((prev) => !prev)}
          className={totalStyles.change_address_toggle}
        >
          <span>تغییر آدرس</span>
          {changeAddress ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </div>

        {changeAddress && (
          <div className={totalStyles.address_form}>
            <Select
              defaultValue={stateSelectedOption}
              onChange={setStateSelectedOption}
              isClearable={true}
              placeholder={"استان"}
              isRtl={true}
              isSearchable={true}
              options={stateOptions}
              styles={customSelectStyles}
              className={totalStyles.select_box}
            />
            <input 
              type="text" 
              placeholder="شهر" 
              className={totalStyles.input_field} 
            />
            <input 
              type="number" 
              placeholder="کد پستی" 
              className={totalStyles.input_field} 
            />
            <button 
              className={totalStyles.update_btn}
              onClick={() => setChangeAddress(false)}
            >
              بروزرسانی
            </button>
          </div>
        )}
      </div>

      <div className={totalStyles.divider}></div>

      <div className={`${totalStyles.summary_row} ${totalStyles.total_row}`}>
        <span>مجموع نهایی</span>
        <span>{finalPrice.toLocaleString()} تومان</span>
      </div>

      <Link href={"/checkout"} className={totalStyles.checkout_link}>
        <button className={totalStyles.checkout_btn}>
          ادامه جهت تسویه حساب
        </button>
      </Link>
    </div>
  );
};

export default Total;