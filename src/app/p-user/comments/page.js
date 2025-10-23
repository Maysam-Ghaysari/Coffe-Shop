import DataTable from "@/components/templates/p-user/comments/DataTable";
import Layout from "@/components/layouts/UserPanelLayout";
import React from "react";
import connectToDB from "@/configs/db";
import CommentModel from "@/models/Comment";
import styles from "@/styles/p-user/dataTable.module.css";
import { authUser } from "@/utils/ServerHelpers";

const page = async () => {
  connectToDB();
  const user = await authUser();
  const comments = await CommentModel.find(
    { user: String(user._id) },
    "-__v"
  ).populate("productID", "name");



  return (
    <Layout>
      <main>
        <DataTable
          comments={JSON.parse(JSON.stringify(comments))}
          title="لیست کامنت‌ها"
        />
        {comments.length === 0 && (
          <p className={styles.empty}>کامنتی وجود ندارد</p>
        )}
        {/*  */}
      </main>
    </Layout>
  );
};

export default page;
