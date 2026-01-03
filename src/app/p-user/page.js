import Layout from "@/components/layouts/UserPanelLayout";
import styles from "@/styles/p-user/index.module.css";
import Box from "@/components/modules/infoBox/InfoBox";
import Tickets from "@/components/templates/p-user/index/Tickets";
import Orders from "@/components/templates/p-user/index/Orders";
import TicketModel from "@/models/Ticket";
import CommentModel from "@/models/Comment";
import WishlistModel from "@/models/Wishlist";
import { authUser } from "@/utils/ServerHelpers";

const page = async () => {
  const user = await authUser();

  // بهینه‌سازی کوئری‌ها برای سرعت بیشتر صفحه
  const [tickets, ticketsCount, commentsCount, wishesCount] = await Promise.all([
    TicketModel.find({ user: user._id }).limit(3).populate("department", "title").sort({ _id: -1 }).lean(),
    TicketModel.countDocuments({ user: user._id }),
    CommentModel.countDocuments({ user: String(user._id) }),
    WishlistModel.countDocuments({ user: user._id }),
  ]);

  return (
    <Layout>
      <main className={styles.main}>
        <section className={styles.boxes_container} data-aos="fade-down">
            <Box title="مجموع تیکت‌ها" value={ticketsCount} unit="تیکت" />
            <Box title="مجموع کامنت‌ها" value={commentsCount} unit="دیدگاه" />
            <Box title="مجموع سفارشات" value="۲" unit="سفارش" />
            <Box title="علاقه‌مندی‌ها" value={wishesCount} unit="محصول" />
        </section>

        <section className={styles.contents_container}>
          <div className={styles.content_item} data-aos="fade-left">
            <Tickets tickets={JSON.parse(JSON.stringify(tickets))} />
          </div>
          <div className={styles.content_item} data-aos="fade-right">
            <Orders />
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default page;