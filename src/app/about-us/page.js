import Breadcrumb from "@/components/modules/breadcrumb/Breadcrumb";
import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import styles from "@/styles/aboutUs.module.css";
import { authUser } from "@/utils/ServerHelpers";

const page = async () => {
  const user = await authUser();

  return (
    <>
      <Navbar isLogin={!!user} />
      <Breadcrumb route={"درباره ما"} />
      
      <main className={styles.container}>
        {/* بخش معرفی اصلی */}
        <section className={styles.heroSection}>
          <div className={styles.heroText}>
            <h2 className={styles.mainTitle}>فنجان داغ خوارزمی؛ قهوه سِت</h2>
            <p className={styles.highlight}>
              تجربه‌ای به قدمت چهار نسل و ارتباط مستمر با مصرف‌کنندگان، ضامن کیفیت ماست.
            </p>
            <p>
              از ویژگی‌های بارز مجموعه قهوه ست، واردات مستقیم مواد اولیه توسط مدیریت مجموعه و انتخاب دقیق بهترین دانه‌ها جهت تولید قهوه تازه است.
            </p>
          </div>
          <div className={styles.heroImage}>
             <img src="/images/about/about-1.webp" alt="فرآیند تولید قهوه" />
          </div>
        </section>

        {/* بخش افتخارات و مدارک */}
        <section className={styles.achievements}>
          <div className={styles.card}>
            <h3>عضویت در SCAE</h3>
            <p>اولین مجموعه مرتبط با قهوه در ایران که در سال ۲۰۰۷ به عضویت انجمن تخصصی قهوه اروپا درآمده است.</p>
          </div>
          <div className={styles.card}>
            <h3>تولید صنعتی</h3>
            <p>در بهمن ماه ۹۴ موفق به اخذ مجوزهای بهداشت و سازمان غذا و دارو شدیم و تولید را از سنتی به صنعتی ارتقا دادیم.</p>
          </div>
          <div className={styles.card}>
             <h3>دیپلم دانش قهوه</h3>
             <p>اخذ مدرک دیپلم دانش قهوه از انجمن قهوه تخصصی اروپا (SCAE) در فروردین ماه سال ۹۵.</p>
          </div>
        </section>

        {/* داستان برند */}
        <section className={styles.storySection}>
           <div className={styles.storyContent}>
              <h2 className={styles.title}>داستان قهوه سِت</h2>
              <p>
                مجموعه قهوه ست بسیاری از دوره‌های مربوط به فرآوری قهوه را به صورت تخصصی در کارگاه‌های آموزشی بین‌المللی، به خصوص در زمینه بو دادن قهوه (Roasting) در کشور آمریکا گذرانده است.
              </p>
              <p>
                اکنون با پشتوانه دستاوردهای گذشته و تکنولوژی روز دنیا، قهوه ست یک نام تجاری صنعتی و پیشرو در صنعت قهوه ایران است.
              </p>
              <div className={styles.owner}>
                <strong>صاحب امتیاز:</strong> شرکت فنجان داغ خوارزمی
              </div>
           </div>
           <div className={styles.storyImage}>
              <img src="/images/about/about-2.jpg" alt="تاریخچه قهوه ست" />
           </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default page;