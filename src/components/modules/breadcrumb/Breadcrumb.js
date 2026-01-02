import Link from "next/link";
import styles from "./breadcrumb.module.css";
import { FaChevronLeft } from "react-icons/fa"; // آیکون برای جداکننده زیباتر

const Breadcrumb = ({ route }) => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>{route}</h1>

          <nav className={styles.path} aria-label="breadcrumb">
            <Link href="/" className={styles.homeLink}>خانه</Link>
            <FaChevronLeft className={styles.separator} />
            <span className={styles.active_step}>{route}</span>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default Breadcrumb;