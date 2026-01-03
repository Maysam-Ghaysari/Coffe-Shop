import Breadcrumb from "@/components/modules/breadcrumb/Breadcrumb";
import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import Product from "@/components/modules/product/Product";
import connectToDB from "@/configs/db";
import styles from "@/styles/wishlist.module.css";
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";
import WishlistModel from "@/models/Wishlist";
import { authUser } from "@/utils/ServerHelpers";

const WishlistPage = async () => {
  await connectToDB(); // استفاده از await برای اطمینان از اتصال قبل از کوئری
  const user = await authUser();
  
  let wishes = [];
  if (user) {
    wishes = await WishlistModel.find({ user: user._id })
      .populate("product") // در صورت نیاز فیلدهای خاص را انتخاب کنید
      .lean();
  }

  return (
    <>
      <Navbar isLogin={!!user} />
      <Breadcrumb route={"علاقه مندی ها"} />
      
      <main className={styles.container}>
        <div className={styles.header_section} data-aos="fade-down">
            {wishes.length > 0 && (
                <span className={styles.count}>{wishes.length} محصول</span>
            )}
        </div>

        {wishes.length > 0 ? (
          <section className={styles.products_grid} data-aos="fade-up">
            {wishes.map((wish) => (
              <Product key={wish._id} {...wish.product} />
            ))}
          </section>
        ) : (
          <div className={styles.wishlist_empty} data-aos="zoom-in">
            <div className={styles.empty_icon_wrapper}>
                <FaRegHeart />
            </div>
            <h2>لیست علاقه مندی‌های شما خالی است</h2>
            <p>شما هنوز هیچ محصولی را به این لیست اضافه نکرده‌اید.</p>
            <p>در صفحه فروشگاه محصولات جذاب زیادی منتظر شما هستند.</p>
            <Link href="/" className={styles.shop_link}>
                بازگشت به صفحه اصلی
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
};

export default WishlistPage;