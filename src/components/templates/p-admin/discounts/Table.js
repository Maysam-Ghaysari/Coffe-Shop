import React from "react";
import styles from "./table.module.css";

function Table({ discounts }) {
  return (
    <div className={styles.table_container}> {/* کانتینر اسکرول اضافه شد */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>شناسه</th>
            <th>کد</th>
            <th>درصد</th>
            <th>حداکثر استفاده</th>
            <th>دفعات استفاده شده</th>
            <th>حذف</th>
          </tr>
        </thead>
        <tbody>
          {discounts.map((discount, index) => (
            <tr key={discount._id}>
              <td className={discount.uses === discount.maxUse ? styles.red : styles.green}>
                {index + 1}
              </td>
              <td>{discount.code}</td>
              <td>{discount.percent}%</td> {/* اضافه کردن علامت درصد برای زیبایی */}
              <td>{discount.maxUse}</td>
              <td>{discount.uses}</td>
              <td>
                <button type="button" className={styles.delete_btn}>حذف</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;