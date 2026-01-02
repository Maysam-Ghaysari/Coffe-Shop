import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import Stepper from "@/components/modules/stepper/Stepper";
import CartContent from "@/components/templates/cart/CartContent";
import { authUser } from "@/utils/ServerHelpers";
import styles from "@/styles/cart.module.css";

const page = async () => {
  const user = await authUser();

  return (
    <>
      <Navbar isLogin={!!user} />
      
      {/* ایجاد فاصله از بالای صفحه برای نوبار fixed */}
      <main className={styles.cart_wrapper}>
        <div className={styles.container}>
          <Stepper step="cart" />
          
          <section className={styles.content_section}>
             <CartContent />
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default page;