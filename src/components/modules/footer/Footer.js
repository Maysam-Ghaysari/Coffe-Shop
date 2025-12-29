import Link from 'next/link';
import { FaRegEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { MdOutlineCopyright } from 'react-icons/md';
import styles from './footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          
          {/* بخش برندینگ و درباره ما */}
          <div className={styles.brandSection}>
            <img src="/images/logo_light.png" alt="لوگو" className={styles.logo} />
            <p className={styles.description}>
              شرکت فنجان داغ خوارزمی، ارائه‌دهنده تخصصی‌ترین دانه‌های قهوه و تجهیزات دم‌آوری با استانداردهای جهانی.
            </p>
            <div className={styles.contactInfo}>
              <div className={styles.infoItem}>
                <FaMapMarkerAlt />
                <span>تهران، خیابان ولیعصر، نرسیده به میدان ونک</span>
              </div>
              <div className={styles.infoItem}>
                <FaPhoneAlt />
                <span dir="ltr">۰۲۱-۸۸۲۷</span>
              </div>
              <div className={styles.infoItem}>
                <FaRegEnvelope />
                <span>info@setcoffee.com</span>
              </div>
            </div>
          </div>

          {/* لینک‌های سریع */}
          <div className={styles.linksColumn}>
            <h4>دسترسی سریع</h4>
            <ul>
              <li><Link href="/category">فروشگاه آنلاین</Link></li>
              <li><Link href="/articles">مجله قهوه</Link></li>
              <li><Link href="/cart">سبد خرید</Link></li>
              <li><Link href="/wishlist">علاقه‌مندی‌ها</Link></li>
            </ul>
          </div>

          {/* راهنمای مشتریان */}
          <div className={styles.linksColumn}>
            <h4>راهنمای مشتریان</h4>
            <ul>
              <li><Link href="/contact-us">تماس با ما</Link></li>
              <li><Link href="/about-us">درباره ما</Link></li>
              <li><Link href="/rules">قوانین و مقررات</Link></li>
              <li><Link href="/faq">سوالات متداول</Link></li>
            </ul>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <div className={styles.copyright}>
            <MdOutlineCopyright />
            <span> ۱۴۰۳ تمام حقوق متعلق است به <strong>قهوه سِت</strong></span>
          </div>
          <div className={styles.developer}>
            طراحی و اجرا توسط <Link href="#">میثم قیصری</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;