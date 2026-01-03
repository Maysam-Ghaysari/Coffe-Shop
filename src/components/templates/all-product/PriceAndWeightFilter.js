"use client";
import styles from "./PriceAndWeightFilter.module.css";
import { useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

const PriceAndWeightFilter = ({ searchParams }) => {
  const router = useRouter();
  const pathname = usePathname();
  const currentParams = useSearchParams(); // دسترسی به تمام پارامترهای فعلی URL
  
  const [minPriceInput, setMinPriceInput] = useState(searchParams.minPrice || '');
  const [maxPriceInput, setMaxPriceInput] = useState(searchParams.maxPrice || '');
  const [minWeightInput, setMinWeightInput] = useState(searchParams.minWeight || '');
  const [maxWeightInput, setMaxWeightInput] = useState(searchParams.maxWeight || '');

  const applyFilters = () => {
    // ایجاد کپی از پارامترهای فعلی برای حفظ "q" (جستجو)
    const params = new URLSearchParams(currentParams.toString());
    
    // بروزرسانی پارامترهای قیمت
    minPriceInput ? params.set("minPrice", minPriceInput) : params.delete("minPrice");
    maxPriceInput ? params.set("maxPrice", maxPriceInput) : params.delete("maxPrice");
    
    // بروزرسانی پارامترهای وزن
    minWeightInput ? params.set("minWeight", minWeightInput) : params.delete("minWeight");
    maxWeightInput ? params.set("maxWeight", maxWeightInput) : params.delete("maxWeight");
    
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleReset = () => {
    setMinPriceInput('');
    setMaxPriceInput('');
    setMinWeightInput('');
    setMaxWeightInput('');
    
    // اگر می‌خواهید سرچ هم پاک نشود، فقط فیلترها را حذف کنید:
    const params = new URLSearchParams(currentParams.toString());
    params.delete("minPrice");
    params.delete("maxPrice");
    params.delete("minWeight");
    params.delete("maxWeight");
    
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className={styles.sidebarFilter}>
      <h4 className={styles.filterTitle}>فیلتر قیمت (تومان)</h4>
      <div className={styles.filterGrid}>
        <div className={styles.filterGroup}>
          <label>از:</label>
          <input
            type="number"
            value={minPriceInput}
            onChange={(e) => setMinPriceInput(e.target.value)}
            placeholder="مثلا 100,000"
          />
        </div>
        <div className={styles.filterGroup}>
          <label>تا:</label>
          <input
            type="number"
            value={maxPriceInput}
            onChange={(e) => setMaxPriceInput(e.target.value)}
            placeholder="مثلا 500,000"
          />
        </div>
      </div>

      <h4 className={styles.filterTitle}>فیلتر وزن (گرم)</h4>
      <div className={styles.filterGrid}>
        <div className={styles.filterGroup}>
          <label>از:</label>
          <input
            type="number"
            value={minWeightInput}
            onChange={(e) => setMinWeightInput(e.target.value)}
            placeholder="حداقل"
          />
        </div>
        <div className={styles.filterGroup}>
          <label>تا:</label>
          <input
            type="number"
            value={maxWeightInput}
            onChange={(e) => setMaxWeightInput(e.target.value)}
            placeholder="حداکثر"
          />
        </div>
      </div>

      <div className={styles.filterButtons}>
        <button onClick={applyFilters} className={styles.applyBtn}>اعمال فیلتر</button>
        <button onClick={handleReset} className={styles.resetBtn}>پاکسازی</button>
      </div>
    </div>
  );
};

export default PriceAndWeightFilter;