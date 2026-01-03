import React from "react";
import styles from "./userPanelLayout.module.css";
import Sidebar from "@/components/modules/p-user/Sidebar";
import { authUser } from "@/utils/ServerHelpers";
import { redirect } from "next/navigation";

const Layout = async ({ children }) => {
  const user = await authUser();

  if (!user) {
    redirect("/login-register");
  }

  return (
    <div className={styles.layout}>
      {/* سایدبار در سمت راست */}
      <Sidebar user={JSON.parse(JSON.stringify(user))} />

      <div className={styles.main}>
        {/* هدر پنل برای نمایش نام کاربر و دکمه خروج یا اعلان‌ها */}
        
        <section className={styles.contents}>
          {children}
        </section>
      </div>
    </div>
  );
};

export default Layout;