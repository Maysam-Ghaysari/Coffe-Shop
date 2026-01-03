import React from "react";
import styles from "./description.module.css"; // یا فایلی که برای توضیحات در نظر دارید

const Description = () => {
  return (
    <div className={styles.description_wrapper}>
      <h2 className={styles.desc_title}>ویژگی‌های تخصصی محصول</h2>
      <hr className={styles.desc_hr} />
      
      <div className={styles.desc_content}>
        <h3 className={styles.product_model}>SETpresso GOLD (۱۰ عددی)</h3>
        
        <div className={styles.specs_summary}>
          <p><span>خاستگاه:</span> South and Central America and Africa (100% ARABICA)</p>
          <p><span>نوع کپسول:</span> NESPRESSO COMPATIBLE (آلومینیومی)</p>
        </div>

        <p className={styles.main_text}>
          کپسول نسپرسو ایرانی <strong>قهوه ست مدل Gold</strong> سازگار با تمامی دستگاه‌های کپسولی نسپرسو است. 
          ترکیب این کپسول قهوه ایرانی از ۱۰۰٪ دانه‌های عربیکا تشکیل شده و با برشته‌کاری (رست) متوسط رو به بالا، 
          اسیدیته‌ای متوازن و تلخی ملایمی را ارائه می‌دهد.
        </p>

        <blockquote className={styles.taste_note}>
          "یک فنجان کاملا متعادل با تندی شبیه به ادویه زنجبیل و طعم یاد کراسان."
        </blockquote>

        <p className={styles.main_text}>
          اگر به نوشیدنی‌های ترکیبی با شیر علاقه دارید، مدل Gold اولین و بهترین انتخاب شماست. 
          این کپسول با شیر ترکیب بسیار مناسبی ایجاد کرده و برای تهیه یک فنجان کاپوچینوی دلپذیر در منزل 
          یا محل کار ایده‌آل است. بدنه آلومینیومی کپسول‌ها علاوه بر حفظ تازگی، فرآیند عصاره‌گیری در دو حالت اسپرسو 
          و لونگو را بسیار آسان می‌کند.
        </p>
      </div>
    </div>
  );
};

export default Description;