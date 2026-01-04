"use client";
import React, { useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import styles from "./sidebar.module.css";
import swal from "sweetalert";

// آیکون‌ها
import { ImReply } from "react-icons/im";
import { FaComments, FaHeart, FaShoppingBag, FaUsers,FaHome,FaChartBar } from "react-icons/fa";
import { MdOutlineAttachMoney, MdSms, MdLogout } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isAdminPanel = pathname.includes("/p-admin");

  // تعریف لینک‌ها
  const links = useMemo(() => {
    const userLinks = [
      { href: "/", text: "صحفه اصلی", icon: <FaHome /> },
      { href: "/p-user", text: "پیشخوان", icon: <FaChartBar /> },
      // { href: "/p-user/orders", text: "سفارش‌ها", icon: <FaShoppingBag /> },
      { href: "/p-user/comments", text: "کامنت‌ها", icon: <FaComments /> },
      { href: "/p-user/wishlist", text: "علاقه‌مندی", icon: <FaHeart /> },
      { href: "/p-user/tickets", text: "تیکت‌ها", icon: <MdSms /> },
      { href: "/p-user/account-details", text: "جزئیات اکانت", icon: <TbListDetails /> },
    ];

    const adminLinks = [
      { href: "/p-admin", text: "پیشخوان", icon: <ImReply /> },
      { href: "/p-admin/products", text: "محصولات", icon: <FaShoppingBag /> },
      { href: "/p-admin/users", text: "کاربران", icon: <FaUsers /> },
      { href: "/p-admin/comments", text: "دیدگاه‌ها", icon: <FaComments /> },
      { href: "/p-admin/tickets", text: "تیکت‌ها", icon: <MdSms /> },
      { href: "/p-admin/discounts", text: "تخفیفات", icon: <MdOutlineAttachMoney /> },
    ];

    return isAdminPanel ? adminLinks : userLinks;
  }, [isAdminPanel]);

  const logoutHandler = () => {
    swal({
      title: "آیا از خروج اطمینان دارید؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then(async (result) => {
      if (result) {
        const res = await fetch("/api/auth/signout", { method: "POST" });
        if (res.status === 200) {
          router.replace("/");
        }
      }
    });
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebar_header}>
        <p>خوش آمدید</p>
      </div>

      <nav className={styles.nav}>
        <ul className={styles.nav_list}>
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link 
                  href={link.href} 
                  className={`${styles.nav_link} ${isActive ? styles.active : ""}`}
                >
                  {link.icon}
                  <span>{link.text}</span>
                </Link>
              </li>
            );
          })}
          {/* دکمه خروج مخصوص لیست */}
          <li className={styles.logout_item} onClick={logoutHandler}>
            <div className={styles.nav_link}>
              <MdLogout />
              <span>خروج</span>
            </div>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;