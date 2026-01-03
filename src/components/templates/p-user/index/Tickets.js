import Ticket from "./Ticket";
import styles from "./tickets.module.css";
import Link from "next/link";
import { FaArrowLeft, FaTicketAlt } from "react-icons/fa";

const Tickets = ({ tickets }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title_section}>
          <FaTicketAlt className={styles.icon} />
          <h3>تیکت‌های اخیر</h3>
        </div>
        <Link href="/p-user/tickets" className={styles.link}>
          همه تیکت‌ها <FaArrowLeft />
        </Link>
      </div>

      <div className={styles.list}>
        {tickets.length > 0 ? (
          tickets.map((ticket) => (
            <Ticket key={ticket._id} {...ticket} />
          ))
        ) : (
          <div className={styles.empty_wrapper}>
            <p className={styles.empty}>هنوز هیچ تیکتی ثبت نکرده‌اید.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tickets;