import React from "react";
import styles from "./moreInfoes.module.css";

const MoreInfoes = ({ product }) => {
  return (
    <div className={styles.more_info_container}>
      <h2 className={styles.info_title}>مشخصات فنی محصول</h2>
      <hr className={styles.info_hr} />
      
      <div className={styles.info_table}>
        <div className={styles.info_row}>
          <span className={styles.info_label}>وزن خالص</span>
          <span className={styles.info_value}>{product.weight} گرم</span>
        </div>
        
        <div className={styles.info_row}>
          <span className={styles.info_label}>ویژگی عطر و بو (Aroma)</span>
          <span className={styles.info_value}>{product.smell}</span>
        </div>
        
        <div className={styles.info_row}>
          <span className={styles.info_label}>مناسب برای</span>
          <span className={styles.info_value}>{product.suitableFor}</span>
        </div>

        {/* می‌توانید موارد دیگری که در مدل محصول دارید را هم اینجا اضافه کنید */}
        {product.roast && (
          <div className={styles.info_row}>
            <span className={styles.info_label}>درجه برشته‌کاری (Roast)</span>
            <span className={styles.info_value}>{product.roast}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoreInfoes;