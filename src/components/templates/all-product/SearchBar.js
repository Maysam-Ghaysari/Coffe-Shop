"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { IoIosSearch } from "react-icons/io";
import styles from "./searchBar.module.css";

const SearchBar = ({ defaultValue }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearch = (term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className={styles.search_box}>
      <input
        type="text"
        placeholder="جستجوی محصول..."
        defaultValue={defaultValue}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <IoIosSearch />
    </div>
  );
};

export default SearchBar;