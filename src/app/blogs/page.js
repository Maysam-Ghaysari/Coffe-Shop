import BlogCard from "@/components/modules/Blogs/BlogCard";
import connectToDB from "@/configs/db";
import BlogsModel from "@/models/Blogs"
const blogs =  async () => {
    connectToDB()
const Blogs = await BlogsModel.find({}).populate().lean()
    return (
        <>
        <div>
                 <h1>بلاگ‌ها</h1>
          <BlogCard  blogs={JSON.parse(JSON.stringify(Blogs))}  />
        </div>
        </>
    )
}
export default blogs;