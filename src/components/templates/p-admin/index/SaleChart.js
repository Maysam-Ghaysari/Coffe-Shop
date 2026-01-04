"use client";
import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip, // اصلاح شد (Import از recharts)
} from "recharts";

function SaleChart() {
  const data = [
    { date: "02/1/1", sale: 2000 },
    { date: "02/1/2", sale: 3000 },
    { date: "02/1/3", sale: 3800 },
    { date: "02/1/4", sale: 2900 },
    { date: "02/1/5", sale: 4000 },
    { date: "02/1/6", sale: 3500 },
  ];

  return (
    // ارتفاع را به 300 پیکسل تغییر دادیم تا در همه دیوایس‌ها پایدار باشد
    <div style={{ width: "100%", height: "300px", direction: "ltr" }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: -20, // برای بهتر دیده شدن اعداد محور Y در موبایل
            bottom: 0,
          }}
        >
          {/* تعریف گرادینت برای زیباتر شدن زیر نمودار */}
          <defs>
            <linearGradient id="colorSale" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#711D1C" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#711D1C" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12, fill: "#666" }} 
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            tick={{ fontSize: 12, fill: "#666" }} 
            axisLine={false}
            tickLine={false}
          />
          
          {/* استایل دادن به تولتیپ (نمایش هنگام هاور) */}
          <Tooltip 
            contentStyle={{ borderRadius: "10px", border: "none", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}
          />

          <Area 
            type="monotone" 
            dataKey="sale" 
            stroke="#711D1C" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorSale)" // استفاده از گرادینت تعریف شده
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SaleChart;