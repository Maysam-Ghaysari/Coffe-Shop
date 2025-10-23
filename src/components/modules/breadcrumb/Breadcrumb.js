import Link from "next/link";
import styles from "./breadcrumb.module.css";

const Breadcrumb = ({ route }) => {
  return (
    <div className={styles.breadcrumb}>
      {/* عنوان صفحه */}
      <h1 className={styles.title}>{route}</h1>

      {/* مسیر ناوبری */}
      <div className={styles.path}>
        <Link href={"/"}>خانه</Link>
        <span className={styles.separator}>/</span>
        <p className={styles.active_step}>{route}</p>
      </div>
    </div>
  );
};

export default Breadcrumb;
