import Link from "next/link";
import styles from "./product.module.css";
import { FaRegStar, FaStar } from "react-icons/fa";
import { CiSearch, CiHeart } from "react-icons/ci";

const Card = ({ name, price, img,score,_id }) => {
const safeScore = Math.max(0, Math.min(5, Number(score) || 0));


  return (
    <div className={styles.card}>
          <Link href={`product/${_id}`}>
      
      <div className={styles.details_container}>
        <img
          src={
            img  
          }
          alt="عکس محصول"
        />
        <div className={styles.icons}>
          <Link href="/">
            <CiSearch />
            <p className={styles.tooltip}>مشاهده سریع</p>
          </Link>
          <div>
            <CiHeart />
            <p className={styles.tooltip}>افزودن به علاقه مندی ها </p>
          </div>
        </div>
        <button>افزودن به سبد خرید</button>
      </div>
   </Link>
      <div className={styles.details}>
        <Link href={`product/${_id}`}>{name}</Link>
         <div>
      {[...Array(safeScore)].map((_, index) => (
  <FaStar key={index} />
))}

{[...Array(5 - safeScore)].map((_, index) => (
  <FaRegStar key={index} />
))}
        </div>
        <span>{price?.toLocaleString()} تومان</span>
      </div>
    </div>
  );
};

export default Card;
