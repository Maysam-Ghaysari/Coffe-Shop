import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import Stepper from "@/components/modules/stepper/Stepper";
import CartContent from "@/components/templates/cart/CartContent";
import { authUser } from "@/utils/ServerHelpers";

import ProductModel from "@/models/Product"

const page = async() => {
  const user = await authUser();
  
  const product = await ProductModel.find({}).populate("").lean("")
  return (
    <>
        <Navbar isLogin={user ? true : false} />

      <Stepper step="cart" />
      <CartContent />
      <Footer />
    </>
  );
};

export default page;
