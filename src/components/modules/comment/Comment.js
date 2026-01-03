import { FaStar, FaRegStar, FaUserCircle } from "react-icons/fa"; // اضافه کردن آیکون کاربر
import styles from "./comment.module.css";

const Comment = ({ username, score, date, body }) => {
  return (
    <section className={styles.comment_card}>
      {/* استفاده از آیکون به جای تگ img */}
      <div className={styles.avatar_wrapper}>
        <FaUserCircle className={styles.avatar_icon} />
      </div>

      <div className={styles.comment_content}>
        <div className={styles.header}>
          <div className={styles.user_meta}>
            <strong className={styles.username}>{username}</strong>
            <span className={styles.date}>
              {new Date(date).toLocaleDateString("fa-IR")}
            </span>
          </div>
          
          <div className={styles.stars}>
            {[...Array(5)].map((_, index) => (
              index < score ? 
              <FaStar key={index} className={styles.fill_star} /> : 
              <FaRegStar key={index} className={styles.empty_star} />
            ))}
          </div>
        </div>

        <div className={styles.body}>
          <p>{body}</p>
        </div>
      </div>
    </section>
  );
};

export default Comment;