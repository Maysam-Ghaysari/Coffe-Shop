"use client";
import styles from "./sidebar.module.css";
import { ImReply } from "react-icons/im";
import {
  FaComments,
  FaHeart,
  FaShoppingBag,
  FaUsers,
} from "react-icons/fa";
import { MdOutlineAttachMoney, MdSms, MdLogout } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import swal from "sweetalert";
import { useMemo } from "react"; // برای بهینه‌سازی

// --- لیست لینک‌های کاربر ---
const userLinks = [
  { href: "/p-user", text: "پیشخوان", icon: <ImReply /> },
  { href: "/p-user/orders", text: "سفارش ها", icon: <FaShoppingBag /> },
  { href: "/p-user/tickets", text: "تیکت های پشتیبانی", icon: <MdSms /> },
  { href: "/p-user/comments", text: "کامنت ها", icon: <FaComments /> },
  { href: "/p-user/wishlist", text: "علاقه مندی", icon: <FaHeart /> },
  {
    href: "/p-user/account-details",
    text: "جزئیات اکانت",
    icon: <TbListDetails />,
  },
];

// --- لیست لینک‌های ادمین ---
const adminLinks = [
  { href: "/p-admin", text: "پیشخوان", icon: <ImReply /> },
  { href: "/p-admin/products", text: "محصولات", icon: <FaShoppingBag /> },
  { href: "/p-admin/users", text: "کاربران", icon: <FaUsers /> },
  { href: "/p-admin/comments", text: "کامنت ها", icon: <FaComments /> },
  { href: "/p-admin/tickets", text: "تیکت ها", icon: <MdSms /> },
  {
    href: "/p-admin/discounts",
    text: "تخفیفات",
    icon: <MdOutlineAttachMoney />,
  },
  { href: "/p-admin/blogs", text: "بلاگ ها", icon: <TbListDetails /> }, // آیکون را اصلاح کردم
];

// --- کامپوننت اصلی ---
const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  // تشخیص نوع پنل (ادمین یا کاربر)
  const isAdminPanel = pathname.includes("/p-admin");

  // انتخاب لیست لینک‌ها بر اساس نوع پنل
  // useMemo از رندرهای غیرضروری جلوگیری می‌کند
  const links = useMemo(
    () => (isAdminPanel ? adminLinks : userLinks),
    [isAdminPanel]
  );

  // تابع داینامیک برای اعمال کلاس active
  const getLinkClass = (href) => {
    const baseClass = styles.link;

    // برای صفحات اصلی پنل، مطابقت دقیق می‌خواهیم
    const isDashboard = href === "/p-user" || href === "/p-admin";
    const isActive = isDashboard
      ? pathname === href
      : pathname.startsWith(href); // برای زیرمجموعه‌ها، مطابقت با شروع آدرس

    return isActive ? `${baseClass} ${styles.active}` : baseClass;
  };

  // تابع خروج (بدون تغییر)
  const logoutHandler = () => {
    swal({
      title: "آیا از خروج اطمینان دارید؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then(async (result) => {
      if (result) {
        const res = await fetch("/api/auth/signout", { method: "POST" });
        if (res.status === 200) {
          swal({
            title: "با موفقیت از اکانت خارج شدین",
            icon: "success",
            buttons: "فهمیدم",
          }).then(() => {
            router.replace("/");
          });
        }
      }
    });
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebar_header}>
        <p>خوش آمدید.</p>
      </div>

      <ul className={styles.sidebar_main}>
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className={getLinkClass(link.href)}>
              {link.icon}
              <span>{link.text}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className={styles.logout} onClick={logoutHandler}>
        <MdLogout />
        <span>خروج</span>
      </div>
    </aside>
  );
};

export default Sidebar;