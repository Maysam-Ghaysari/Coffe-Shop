import Breadcrumb from "@/components/modules/breadcrumb/Breadcrumb";
import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import styles from "@/styles/rules.module.css";
import { authUser } from "@/utils/ServerHelpers";
import { FaShieldAlt, FaUserShield, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const page = async () => {
  const user = await authUser();

  return (
    <>
      <Navbar isLogin={!!user} />
      <Breadcrumb route={"قوانین و حریم خصوصی"} />
      
      <main className={styles.main}>
        <div className={styles.container} data-aos="fade-up">
          <section className={styles.section}>
            <div className={styles.titleWrapper}>
              <FaShieldAlt className={styles.icon} />
              <h2>حریم شخصی کاربران</h2>
            </div>
            <p>
              “قهوه ست” ضمن احترامی که برای حریم شخصی کاربران قائل است، برای خرید، ثبت نظر یا استفاده از برخی امکانات وب سایت اطلاعاتی را از کاربران درخواست می‌کند تا بتواند خدماتی امن و مطمئن را به کاربران ارائه دهد...
            </p>
          </section>

          <section className={styles.section}>
            <div className={styles.titleWrapper}>
              <FaUserShield className={styles.icon} />
              <h2>امنیت اطلاعات</h2>
            </div>
            <p>
              حفظ و نگهداری رمز عبور بر عهده کاربران است و برای جلوگیری از هرگونه سوء استفاده احتمالی، کاربران نباید آن را برای شخص دیگری فاش کنند. قهوه ست هویت شخصی کاربران را محرمانه می‌داند...
            </p>
          </section>

          <div className={styles.contactBox}>
            <div className={styles.contactItem}>
              <FaMapMarkerAlt />
              <span>استان تهران – شهر تهران – خیابان انقلاب روبروی خیابان ویلا (نجات الهی)</span>
            </div>
            <div className={styles.contactItem}>
              <FaPhoneAlt />
              <span dir="ltr">۰۲۱ - ۶۶۷۲۶۵۶۳</span>
              <small>(پاسخگویی طی ساعات کاری)</small>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default page;