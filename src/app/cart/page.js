import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import Stepper from "@/components/modules/stepper/Stepper";
import CartContent from "@/components/templates/cart/CartContent";
import { authUser } from "@/utils/ServerHelpers";



const page = async() => {
  const user = await authUser();
  
  return (
    <>
        <Navbar isLogin={user ? true : false} />

      <Stepper step="cart" />
      <CartContent/>
      <Footer />
    </>
  );
};

export default page;
