import React from "react";
import styles from "./userPanelLayout.module.css";
import Sidebar from "@/components/modules/p-user/Sidebar";
import Topbar from "@/components/modules/p-user/Topbar";
import { authUser } from "@/utils/ServerHelpers";
import { redirect } from "next/navigation";
import UserModel from "@/models/User"

const Layout = async ({ children }) => {
  const user = await authUser();
  if (!user) {
    redirect("/login-register");
  }
  const UserDetail= await UserModel.find({}).populate("")
  return (
    <div className={styles.layout}>
      <section className={styles.section}>
        <Sidebar />
        <div className={styles.contents}>
          {children}
        </div>
      </section>
    </div>
  );
};

export default Layout;
