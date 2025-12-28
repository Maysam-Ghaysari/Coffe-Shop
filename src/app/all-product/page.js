// pages/allproduct/page.js (فرض کنید App Router اینجاست)

import connectToDB from "@/configs/db";
import ProductModel from "@/models/Product";
import Product from "@/components/modules/product/Product";
import styles from "@/components/templates/index/latest/latest.module.css";
import PriceAndWeightFilter from "@/components/templates/all-product/PriceAndWeightFilter";

// کامپوننت سرور حالا searchParams را دریافت می‌کند
const AllProductPage = async ({ searchParams }) => {
  await connectToDB(); // استفاده از await برای اتصال

  // استخراج پارامترها از URL (با استفاده از منطق API شما)
  const minPrice = parseFloat(searchParams.minPrice) || 0;
  const maxPrice = parseFloat(searchParams.maxPrice) || Infinity;
  const minWeight = parseFloat(searchParams.minWeight) || 0;
  const maxWeight = parseFloat(searchParams.maxWeight) || Infinity;
  // فرض کنید فیلتر وزن را فعلاً کنار می‌گذاریم و روی قیمت تمرکز می‌کنیم.
  // شما می‌توانید فیلترهای دیگر را نیز اضافه کنید (مثلاً category).
  
  // ساخت آبجکت فیلتر برای MongoDB
  const filter = {
    price: { $gte: minPrice, $lte: maxPrice },
    weight: { $gte: minWeight, $lte: maxWeight },
    // می‌توانید فیلترهای دیگر را اینجا اضافه کنید:
    // category: searchParams.category ? searchParams.category : { $exists: true }
  };

  // گرفتن محصولات فیلتر شده از دیتابیس
  const allproducts = await ProductModel.find(filter)
    .populate("")
    .lean();

  console.log("Products filtered with:", filter);

  // سریالایز کردن برای اطمینان از سازگاری (اگرچه با .lean() کمتر ضروری است)
  const products = JSON.parse(JSON.stringify(allproducts));

  return (
    <div className={styles.container}>
      <section className={styles.title}>
        <h1>همه محصولات</h1>
      </section>
      
      {/* اینجا باید کامپوننت فیلترینگ کلاینت را قرار دهید */}
      <aside>
        <PriceAndWeightFilter searchParams={searchParams} />
        {/* بقیه فیلترها... */}
      </aside>
      
      <main data-aos="fade-up" className={styles.products}>
        {products.map((product) => (
          // مطمئن شوید که کامپوننت Product شما فیلدهای لازم را می‌پذیرد
          <Product key={product._id} {...product} />
        ))}
      </main>
    </div>
  );
};

export default AllProductPage;