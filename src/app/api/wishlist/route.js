import connectToDB from "@/configs/db";
import WishlisiModel from "@/models/Wishlist";

export async function POST(req) {
  connectToDB();
  const body = await req.json();
  const { user, product } = body;

  //خطا تکراری بودن علاقه مندی

  const wish = await WishlisiModel.findOne({ user, product });
  if (wish) {
    return Response.json({ message: "Re Product" }, { status: 421 });
  }

  if (!wish) {
    const Wishlist = await WishlisiModel.create({
      user,
      product,
    });
  }

  return Response.json(
    { message: "Product created to WishList successfully :))" },
    { status: 201 }
  );
}
