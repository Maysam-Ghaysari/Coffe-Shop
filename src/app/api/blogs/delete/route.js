import connectToDB from "@/configs/db";
import BlogModel from "@/models/Blogs";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function DELETE(req) {
  try {
    await connectToDB();
    const body = await req.json();
    const { id } = body;

    // پیدا کردن بلاگ برای گرفتن مسیر تصویر
    const blog = await BlogModel.findById(id).lean();
    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

  if (blog.image) {
  const filename = path.basename(blog.image);
  
  const filePath = path.join(process.cwd(), "public/uploads/blogs/"+ filename);

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath); // فقط همین فایل حذف می‌شود
  }
}

    // حذف رکورد بلاگ از دیتابیس
    await BlogModel.findByIdAndDelete(id);

    return NextResponse.json({ message: "Blog removed successfully" });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
