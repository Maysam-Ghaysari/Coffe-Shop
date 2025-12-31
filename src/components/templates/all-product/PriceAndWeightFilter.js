
"use client";
import styles from "./PriceAndWeightFilter.module.css"
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const PriceAndWeightFilter = ({ searchParams }) => {
  const router = useRouter();
  const pathname = usePathname();
  
  // تنظیم حالت اولیه برای قیمت و وزن (مانند قبل)
  const [minPriceInput, setMinPriceInput] = useState(searchParams.minPrice || '');
  const [maxPriceInput, setMaxPriceInput] = useState(searchParams.maxPrice || '');
  const [minWeightInput, setMinWeightInput] = useState(searchParams.minWeight || '');
  const [maxWeightInput, setMaxWeightInput] = useState(searchParams.maxWeight || '');



  const applyFilters = () => {
    const params = new URLSearchParams();
    
    // ۱. پارامترهای قیمت
    if (minPriceInput) {
      params.set("minPrice", minPriceInput);
    }
    if (maxPriceInput) {
      params.set("maxPrice", maxPriceInput);
    }
    
    // ۲. پارامترهای وزن
    if (minWeightInput) {
      params.set("minWeight", minWeightInput);
    }
    if (maxWeightInput) {
      params.set("maxWeight", maxWeightInput);
    }
    
  
    
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleReset = () => {
    // بازنشانی همه فیلدها
    setMinPriceInput('');
    setMaxPriceInput('');
    setMinWeightInput('');
    setMaxWeightInput('');
    
    router.push(pathname); 
  };

  return (
 <div className={styles.sidebarFilter}>
  <h4 className={styles.filterTitle}> فیلتر قیمت (تومان)</h4>
  <div className={styles.filterGrid}>
    <div className={styles.filterGroup}>
      <label htmlFor="minPrice">از:</label>
      <input
        id="minPrice"
        type="number"
        value={minPriceInput}
        onChange={(e) => setMinPriceInput(e.target.value)}
        placeholder="حداقل قیمت"
      />
    </div>
    <div className={styles.filterGroup}>
      <label htmlFor="maxPrice">تا:</label>
      <input
        id="maxPrice"
        type="number"
        value={maxPriceInput}
        onChange={(e) => setMaxPriceInput(e.target.value)}
        placeholder="حداکثر قیمت"
      />
    </div>
  </div>

  {/* --- فیلتر وزن --- */}
  <h4 className={styles.filterTitle} style={{ marginTop: '30px' }}> فیلتر وزن (به گرم/واحد)</h4>
  <div className={styles.filterGrid}>
    <div className={styles.filterGroup}>
      <label htmlFor="minWeight">از:</label>
      <input
        id="minWeight"
        type="number"
        value={minWeightInput}
        onChange={(e) => setMinWeightInput(e.target.value)}
        placeholder="حداقل وزن"
      />
    </div>
    <div className={styles.filterGroup}>
      <label htmlFor="maxWeight">تا:</label>
      <input
        id="maxWeight"
        type="number"
        value={maxWeightInput}
        onChange={(e) => setMaxWeightInput(e.target.value)}
        placeholder="حداکثر وزن"
      />
    </div>
  </div>

  {/* --- دکمه‌ها --- */}
  <div className={styles.filterButtons}>
    <button onClick={applyFilters} className={styles.applyBtn}>اعمال فیلتر</button>
    <button onClick={handleReset} className={styles.resetBtn}>حذف همه فیلترها</button>
  </div>
</div>
);
};

export default PriceAndWeightFilter;