import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import Articles from "@/components/templates/index/articles/Articles";
import Banner from "@/components/templates/index/banner/Banner";
import Latest from "@/components/templates/index/latest/Latest";
import Promote from "@/components/templates/index/promote/Promote";
import ProductModel from "@/models/Product";
import BlogsModel from "@/models/Blogs"
import { authUser } from "@/utils/ServerHelpers";

export default async function Home() {
  const user = await authUser();
  const latestProducts = await ProductModel.find({}).populate("").sort({ _id:-1 }).limit(4);
  const Blogs = await BlogsModel.find({}).populate("").sort({id:-1}).limit(5)
  
  return (
    <>
      <Navbar isLogin={user ? true : false} />
      <Banner />
      <Latest products={JSON.parse(JSON.stringify(latestProducts))} />
      <Promote />
      <Articles  blogs={JSON.parse(JSON.stringify(Blogs))} />
      <Footer />
    </>
  );

}
