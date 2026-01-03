"use client";
import React, { useState } from "react";
import styles from "./tabs.module.css";
import Description from "./Description";
import MoreInfoes from "./MoreInfoes";
import Comments from "./Comments";

const Tabs = ({ product, userID }) => {
  const [tab, setTab] = useState("description");

  // محاسبه تعداد نظرات تایید شده
  const acceptedCommentsCount = product.comments.filter((c) => c.isAccept).length;

  return (
    <div data-aos="fade-up" className={styles.tabs_container}>
      <ul className={styles.tabs_header}>
        <li>
          <button
            className={tab === "description" ? styles.active_tab : ""}
            onClick={() => setTab("description")}
          >
            توضیحات
          </button>
        </li>
        <li>
          <button
            className={tab === "moreInfoes" ? styles.active_tab : ""}
            onClick={() => setTab("moreInfoes")}
          >
            اطلاعات بیشتر
          </button>
        </li>
        <li>
          <button
            className={tab === "comments" ? styles.active_tab : ""}
            onClick={() => setTab("comments")}
          >
            نظرات ({acceptedCommentsCount})
          </button>
        </li>
      </ul>

      <div className={styles.tabs_content}>
        {tab === "description" && <Description product={product} />}
        {tab === "moreInfoes" && <MoreInfoes product={product} />}
        {tab === "comments" && (
          <Comments
            userID={userID}
            productID={product._id}
            comments={product.comments}
          />
        )}
      </div>
    </div>
  );
};

export default Tabs;