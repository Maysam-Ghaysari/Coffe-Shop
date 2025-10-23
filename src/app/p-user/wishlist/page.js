import UserPanelLayout from "@/components/layouts/UserPanelLayout";
import styles from "@/styles/p-user/wishlist.module.css";
import Card from "@/components/templates/p-user/wishlist/Card";
import connectToDB from "@/configs/db";
import WishlistModel from "@/models/Wishlist";
import { authUser } from "@/utils/ServerHelpers";

const page = async () => {
  connectToDB();
  const user = await authUser();
  const wishlist = await WishlistModel.find({ user: user._id }).populate(
    "product"
  );

  return (
    <UserPanelLayout>
      <main>
        <h1 className={styles.title}>
          <span>علاقه مندی ها</span>
        </h1>
        <div className={styles.container}>
          {wishlist.length &&
            wishlist.map((wish) => (
              <Card
                productID={String(wish.product._id)}
                key={wish._id}
                name={wish.product.name}
                score={wish.product.score}
                price={wish.product.price}
                img={wish.product.img}
              />
            ))}
        </div>

        {wishlist.length === 0 && (
          <p className={styles.empty}>محصولی وجود ندارد</p>
        )}
      </main>
    </UserPanelLayout>
  );
};

export default page;
