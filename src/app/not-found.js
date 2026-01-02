import styles from "@/styles/404.module.css";
import Link from "next/link";

const page = () => {
  return (
    <div className={styles.container}>
      <div className={styles.contents}>
        <span className={styles.number}>4</span>
        
        {/* المان گرافیکی ماگ قهوه */}
        <div className={styles.mug_wrapper}>
          <div className={styles.steam}>
            <span className={styles.s1}></span>
            <span className={styles.s2}></span>
            <span className={styles.s3}></span>
          </div>
          <div className={styles.mug}>
            <div className={styles.handle}></div>
          </div>
        </div>

        <span className={styles.number}>4</span>
      </div>

      <div className={styles.texts}>
        <h1>اوپس! فنجان خالیست...</h1>
        <p>صفحه مورد نظر شما تبخیر شده یا اصلاً وجود نداشته است.</p>
        <Link href="/" className={styles.back_btn}>
          بازگشت به کافه (صفحه اصلی)
        </Link>
      </div>
    </div>
  );
};

export default page;