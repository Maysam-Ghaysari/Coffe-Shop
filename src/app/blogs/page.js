import BlogCard from "@/components/modules/Blogs/BlogCard";
import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import styles from "@/styles/blogs.module.css"
import connectToDB from "@/configs/db";
import BlogsModel from "@/models/Blogs"
import { authUser } from "@/utils/ServerHelpers";
const blogs =  async () => {
      const user = await authUser();
    connectToDB()
const Blogs = await BlogsModel.find({}).populate().lean()
    return (
        <>
        <Navbar isLogin={user ? true : false} />
        <div className={styles.blogs}>
          <BlogCard  blogs={JSON.parse(JSON.stringify(Blogs))}  />
        </div>
        <Footer/>
        </>
    )
}
export default blogs;