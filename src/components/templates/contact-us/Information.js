import {
  FaEnvelopeOpenText,
  FaInternetExplorer,
  FaPhone,
  FaTelegramPlane,
} from "react-icons/fa";
import styles from "./information.module.css";
import { PiCoffeeFill } from "react-icons/pi";
import { BiSolidContact } from "react-icons/bi";

const Information = () => {
  return (
    <section className={styles.info_section}>
      <span className={styles.badge}>اطلاعات ارتباطی</span>
      <h2 className={styles.title}>راه‌های تماس با ما</h2>
      <p className={styles.description}>
        کارشناسان ما در سریع‌ترین زمان ممکن پاسخگوی شما خواهند بود.
      </p>

      <div className={styles.details_container}>
        <div className={styles.info_card}>
          <div className={styles.icon_box}><PiCoffeeFill /></div>
          <div className={styles.texts}>
            <strong>نام مجموعه</strong>
            <p>شرکت فنجان داغ خوارزمی (کارخانه قهوه ست)</p>
          </div>
        </div>

        <div className={styles.info_card}>
          <div className={styles.icon_box}><FaInternetExplorer /></div>
          <div className={styles.texts}>
            <strong>وب‌سایت رسمی</strong>
            <p>www.set-coffee.com</p>
          </div>
        </div>

        <div className={styles.info_card}>
          <div className={styles.icon_box}><BiSolidContact /></div>
          <div className={styles.texts}>
            <strong>آدرس کارخانه</strong>
            <p>تهران، پاکدشت، شهرک صنعتی خوارزمی، فاز ۲، بلوار بهارستان، خیابان ماگنولیا، بلوک آ۱۱۷</p>
          </div>
        </div>

        <div className={styles.info_card}>
          <div className={styles.icon_box}><FaPhone /></div>
          <div className={styles.texts}>
            <strong>شماره تماس</strong>
            <p dir="ltr">۰۲۱ - ۳۶۴۷۹۲۲۸</p>
          </div>
        </div>

        <div className={styles.info_card}>
          <div className={styles.icon_box}><FaEnvelopeOpenText /></div>
          <div className={styles.texts}>
            <strong>ایمیل‌های رسمی</strong>
            <p>coffee[at]set-coffee.com</p>
            <p>whole[at]set-coffee.com</p>
          </div>
        </div>

        <div className={styles.info_card + " " + styles.social_card}>
          <div className={styles.icon_box}><FaTelegramPlane /></div>
          <div className={styles.texts}>
            <strong>ارتباط مستقیم با مدیریت</strong>
            <p>واتساپ و تلگرام: <span dir="ltr">۰۹۳۶ ۶۷۲ ۶۵۶۳</span></p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Information;