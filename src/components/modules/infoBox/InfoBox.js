import React from "react";
import styles from "./infoBox.module.css";
import { IoStatsChart } from "react-icons/io5";

const Box = ({ title, value, icon }) => {
  return (
    <div className={styles.box}>
      <div className={styles.box_content}>
        <p className={styles.box_title}>{title}</p>
        <h3 className={styles.box_value}>{value?.toLocaleString("fa-IR")}</h3>
      </div>
      <div className={styles.icon_wrapper}>
        {icon ? icon : <IoStatsChart className={styles.default_icon} />}
      </div>
    </div>
  );
};

export default Box;