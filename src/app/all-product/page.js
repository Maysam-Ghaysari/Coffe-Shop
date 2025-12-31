import connectToDB from "@/configs/db";
import ProductModel from "@/models/Product";
import Product from "@/components/modules/product/Product";
import styles from "@/components/templates/index/latest/latest.module.css";
import PriceAndWeightFilter from "@/components/templates/all-product/PriceAndWeightFilter";
import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import { authUser } from "@/utils/ServerHelpers";

const AllProductPage = async ({ searchParams }) => {
    const user = await authUser();
  
  await connectToDB(); 

  const minPrice = parseFloat(searchParams.minPrice) || 0;
  const maxPrice = parseFloat(searchParams.maxPrice) || Infinity;
  const minWeight = parseFloat(searchParams.minWeight) || 0;
  const maxWeight = parseFloat(searchParams.maxWeight) || Infinity;

  const filter = {
    price: { $gte: minPrice, $lte: maxPrice },
    weight: { $gte: minWeight, $lte: maxWeight },
  };

  // گرفتن محصولات فیلتر شده از دیتابیس
  const allproducts = await ProductModel.find(filter)
    .populate("")
    .lean();


  const products = JSON.parse(JSON.stringify(allproducts));

  return (
    <>
    <Navbar isLogin={user ? true : false}/>
    <div className={styles.container}>
      <section className={styles.title}>
        <h1>همه محصولات</h1>
      </section>
      
      <aside>
        <PriceAndWeightFilter searchParams={searchParams} />
      </aside>
      
      <main data-aos="fade-up" className={styles.products}>
        {products.map((product) => (
          <Product key={product._id} {...product} />
        ))}
      </main>
    </div>
      <Footer/>
    </>

  );
};

export default AllProductPage;