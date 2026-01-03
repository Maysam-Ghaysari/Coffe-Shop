import Comment from "@/components/modules/comment/Comment";
import styles from "./comments.module.css";
import CommentForm from "./CommentForm";

const Comments = ({ productID, comments, userID }) => {
  // نظرات تایید شده را یکبار فیلتر می‌کنیم
  const acceptedComments = comments.filter((comment) => comment.isAccept);

  return (
    <div className={styles.comments_container}>
      <div className={styles.comments_header}>
        <h3>نظرات کاربران ({acceptedComments.length})</h3>
        <hr className={styles.divider} />
      </div>

      <main className={styles.comments_wrapper}>
        {/* لیست نظرات سمت راست یا بالا */}
        <section className={styles.user_comments_section}>
          {acceptedComments.length > 0 ? (
            <div className={styles.comments_list}>
              {acceptedComments.map((comment) => (
                <Comment key={comment._id} {...comment} />
              ))}
            </div>
          ) : (
            <div className={styles.no_comments}>
              <p>هنوز هیچ دیدگاهی برای این محصول ثبت نشده است. اولین نفری باشید که نظر می‌دهید!</p>
            </div>
          )}
        </section>

        {/* فرم ثبت نظر سمت چپ یا پایین */}
        <section className={styles.form_section}>
          <div className={styles.sticky_form}>
            <CommentForm productID={productID} userID={userID} />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Comments;