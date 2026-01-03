import connectToDB from "@/configs/db";
import ProductModel from "@/models/Product";
import Product from "@/components/modules/product/Product";
import styles from "@/styles/allProducts.module.css";
import PriceAndWeightFilter from "@/components/templates/all-product/PriceAndWeightFilter";
import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import { authUser } from "@/utils/ServerHelpers";
import SearchBar from "@/components/templates/all-product/SearchBar"; // کامپوننت جدید برای سرچ

const AllProductPage = async ({ searchParams }) => {
  const user = await authUser();
  await connectToDB();

  // استخراج مقادیر از searchParams
  const minPrice = parseFloat(searchParams.minPrice) || 0;
  const maxPrice = parseFloat(searchParams.maxPrice) || Infinity;
  const minWeight = parseFloat(searchParams.minWeight) || 0;
  const maxWeight = parseFloat(searchParams.maxWeight) || Infinity;
  const search = searchParams.q || ""; // مقدار جستجو

  // ساخت آبجکت فیلتر برای مونگوس
  const filter = {
    price: { $gte: minPrice, $lte: maxPrice },
    weight: { $gte: minWeight, $lte: maxWeight },
  };

  // اضافه کردن شرط جستجو (در نام یا توضیحات محصول)
  if (search) {
    filter.name = { $regex: search, $options: "i" }; // جستجوی حساس نبودن به حروف کوچک و بزرگ
  }

  const allProducts = await ProductModel.find(filter).lean();
  const products = JSON.parse(JSON.stringify(allProducts));

  return (
    <>
      <Navbar isLogin={!!user} />
      
      <div className={styles.container}>
        {/* بخش عنوان و سرچ‌بار */}
        <header className={styles.header}>
          <div className={styles.title_box}>
            <h1>فروشگاه محصولات</h1>
            <p>بهترین کپسول‌های قهوه ست‌پرسو را اینجا بیابید</p>
          </div>
        
        </header>
  <div className={styles.search_wrapper}>
            <SearchBar defaultValue={search} />
          </div>
        <div className={styles.main_content}>
          {/* سایدبار فیلترها */}
          <aside className={styles.sidebar}>
            <PriceAndWeightFilter searchParams={searchParams} />
          </aside>

          {/* نمایش محصولات */}
          <main className={styles.products_section}>
            {products.length > 0 ? (
              <div className={styles.grid} data-aos="fade-up">
                {products.map((product) => (
                  <Product key={product._id} {...product} />
                ))}
              </div>
            ) : (
              <div className={styles.empty_state}>
                {/* <img src="/images/no-results.png" alt="پیدا نشد" /> */}
                <p>متأسفانه هیچ محصولی با مشخصات شما یافت نشد.</p>
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AllProductPage;