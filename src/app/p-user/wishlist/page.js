import UserPanelLayout from "@/components/layouts/UserPanelLayout";
import styles from "@/styles/p-user/wishlist.module.css";
import Card from "@/components/templates/p-user/wishlist/Card";
import connectToDB from "@/configs/db";
import WishlistModel from "@/models/Wishlist";
import { authUser } from "@/utils/ServerHelpers";
import { redirect } from "next/navigation";

const page = async () => {
  await connectToDB();
  const user = await authUser();
  
  if (!user) return redirect("/login-register");

  const wishlist = await WishlistModel.find({ user: user._id })
    .populate("product")
    .lean();

  return (
    <UserPanelLayout>
      <main className={styles.main}>
        <h1 className={styles.title}>
          <span>علاقه‌مندی‌ها</span>
        </h1>
        
        <div className={styles.container}>
          {wishlist.length > 0 ? (
            wishlist.map((wish) => (
              <Card
                productID={String(wish.product._id)}
                key={wish._id}
                name={wish.product.name}
                score={wish.product.score}
                price={wish.product.price}
                img={wish.product.img}
              />
            ))
          ) : (
            <div className={styles.empty_wrapper}>
              <p className={styles.empty}>لیست علاقه‌مندی‌های شما خالی است.</p>
            </div>
          )}
        </div>
      </main>
    </UserPanelLayout>
  );
};

export default page;