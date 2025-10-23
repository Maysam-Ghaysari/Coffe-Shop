import "./globals.css";
// import { Inter } from "next/font/google";
import AOSInit from "@/utils/aos";
import ScrollToTop from "@/utils/SctollToTop";
import {Lateef} from "next/font/google";

const roboto = Lateef({
  subsets :["latin"],
  weight:"400"
}) 


// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "صفحه اصلی - SET Coffee | فروشگاه اینترنتی قهوه ست",
  description: "Sabzlearn coffee project with next.js v13",
  icons: {
    icon: "https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/36190/coffee-logo-clipart-md.png",
  },
};

export default function Layout({ children }) {
  return (
    <html lang="fa" className={roboto.className}>
      <body>
        <AOSInit />
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
