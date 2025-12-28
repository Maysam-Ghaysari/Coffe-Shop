import Layout from "@/components/layouts/AdminPanelLayout";
import AddBlog from "@/components/templates/p-admin/blogs/AddBlog";
import BlogTable from "@/components/templates/p-admin/blogs/BlogTable";
import connectToDB from "@/configs/db";
import BlogModel from "@/models/Blogs"

const blogs = async () => {
connectToDB()
const blogs = await BlogModel.find({}).sort({ _id: -1 })
    .populate("")
    .lean();

    return (
      <Layout>
        <AddBlog/>
      <main>
        {blogs.length === 0 ? (
          <p >بلاگی وجود ندارد</p>
        ) : (
          <BlogTable
            blogs={JSON.parse(JSON.stringify(blogs))}
            title="لیست بلاگ ها"
          />
        )}
      </main>
    </Layout>
        
    )
}
export default blogs;