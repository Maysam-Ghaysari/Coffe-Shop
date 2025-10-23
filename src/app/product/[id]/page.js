import styles from "@/styles/product.module.css";
import Gallery from "@/components/templates/product/Gallery";
import Details from "@/components/templates/product/Details";
import Tabs from "@/components/templates/product/Tabs";
import MoreProducts from "@/components/templates/product/MoreProducts";
import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import connectToDB from "@/configs/db";
import ProductModel from "@/models/Product";
import UserModel from "@/models/User";

import { authUser } from "@/utils/ServerHelpers";

const product = async ({ params }) => {
  const user =await authUser();
   connectToDB();
  const productID = params.id;
  const product = await ProductModel.findOne({ _id: productID }).populate(
    "comments"
  );
const userid = await UserModel.findOne().populate("")


  const relaitedProducts = await ProductModel.find({
    smell: product.smell,
  });

  return (
    <div className={styles.container}>
      <Navbar isLogin={user ? true : false} />
      <div data-aos="fade-up" className={styles.contents}>
        <div className={styles.main}>
          <Gallery product={JSON.parse(JSON.stringify(product))}  />
          <Details product={JSON.parse(JSON.stringify(product))} />
        </div>
        <Tabs product={JSON.parse(JSON.stringify(product))} userID={JSON.parse(JSON.stringify(userid))} />
        <MoreProducts
          relaitedProducts={JSON.parse(JSON.stringify(relaitedProducts))}
        />
      </div>
      <Footer />
    </div>
  );
};

export default product;
