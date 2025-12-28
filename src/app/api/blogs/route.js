import connectToDB from "@/configs/db";
import BlogsModels from "@/models/Blogs";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req) {
  try {
    await connectToDB();

    // گرفتن FormData
    const formData = await req.formData();

    const title = formData.get("title");
    const slug = formData.get("slug");
    const mainTitle = formData.get("mainTitle");
    const excerpt = formData.get("excerpt");
    const content = formData.get("content");
    const author = formData.get("author");
    const tags = formData.get("tags");
    const image = formData.get("image");

    if (!title || !slug || !mainTitle) {
      return Response.json(
        { message: "title و slug و mainTitle الزامی هستند." },
        { status: 400 }
      );
    }

    let imageURL = "";

    if (image) {
      const buffer = Buffer.from(await image.arrayBuffer());
      const filename = Date.now() + image.name;
      await writeFile(
        path.join(process.cwd(), "public/uploads/blogs/" + filename),
        buffer
      );
      imageURL = `/uploads/blogs/${filename}`;
    }

    const blog = await BlogsModels.create({
      title,
      slug,
      mainTitle,
      excerpt,
      content,
      author,
      tags: tags ? tags.split("،") : [],
      image: imageURL,
    });

    return Response.json(
      { message: "Blog created successfully :))", blog },
      { status: 201 }
    );
  } catch (err) {
    return Response.json(
      { message: "Server Error", error: err.message },
      { status: 500 }
    );
  }
}

// گرفتن تمام بلاگ‌ها
export async function GET() {
  await connectToDB();
  const blogs = await BlogsModels.find({}, "-__v");
  return Response.json(blogs);
}
