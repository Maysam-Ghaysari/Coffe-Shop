import connectToDB from "@/configs/db";
import ProductModel from "@/models/Product";

export async function GET(req) {
  try {
    // اتصال به دیتابیس
    await connectToDB(); // 💡 مطمئن شوید که از await استفاده می‌کنید

    // گرفتن query params
    const { searchParams } = new URL(req.url);

    // 1. فیلتر قیمت
    const minPrice = parseFloat(searchParams.get("minPrice")) || 0;
    const maxPrice = parseFloat(searchParams.get("maxPrice")) || Infinity;
    
    // 2. فیلتر وزن
    const minWeight = parseFloat(searchParams.get("minWeight")) || 0;
    const maxWeight = parseFloat(searchParams.get("maxWeight")) || Infinity;

   
    
    // 4. ساخت آبجکت فیلتر برای MongoDB
    const mongoFilter = {
      price: { $gte: minPrice, $lte: maxPrice },
      weight: { $gte: minWeight, $lte: maxWeight },
    };
    

    const filteredProducts = await ProductModel.find(mongoFilter)
      .lean();

    return new Response(JSON.stringify(filteredProducts), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error fetching products:", error);
    return new Response(JSON.stringify({ error: "Server Error", message: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}