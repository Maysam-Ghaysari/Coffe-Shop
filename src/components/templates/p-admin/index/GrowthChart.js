"use client";
import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

function GrowthChart() {
  const data = [
    { name: "02/1/1", current: 4000, prev: 2400 },
    { name: "02/2/1", current: 4300, prev: 4000 },
    { name: "02/3/1", current: 5000, prev: 4300 },
    { name: "02/4/1", current: 3800, prev: 5000 },
    { name: "02/5/1", current: 4200, prev: 3800 },
    { name: "02/6/1", current: 3900, prev: 4200 },
  ];

  // استایل‌های سفارشی برای بخش‌های مختلف
  const chartStyles = {
    container: {
      width: "100%",
      height: "300px",
      direction: "ltr",
      backgroundColor: "#fff",
      padding: "10px",
      borderRadius: "15px",
    },
    tooltip: {
      backgroundColor: "rgba(255, 255, 255, 0.96)",
      borderRadius: "10px",
      border: "none",
      boxShadow: "0 8px 15px rgba(0,0,0,0.1)",
      fontSize: "12px",
      textAlign: "right",
      fontFamily: "Tahoma, sans-serif",
    }
  };

  return (
    <div style={chartStyles.container}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          {/* خطوط پس‌زمینه افقی */}
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "#999", fontSize: 11 }}
            dy={10}
          />
          
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "#999", fontSize: 11 }}
          />

          {/* تولتیپ اختصاصی با فونت فارسی و استایل مدرن */}
          <Tooltip 
            contentStyle={chartStyles.tooltip}
            itemStyle={{ padding: "2px 0" }}
          />

          <Legend 
            verticalAlign="top" 
            align="right" 
            iconType="circle"
            wrapperStyle={{ paddingBottom: "20px", fontSize: "12px" }}
          />

          {/* خط مربوط به دوره قبلی */}
          <Line 
            name="دوره قبل"
            type="monotone" 
            dataKey="prev" 
            stroke="#d4a373" /* رنگ کرم تم */
            strokeWidth={3}
            dot={{ r: 4, fill: "#d4a373" }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />

          {/* خط مربوط به دوره فعلی */}
          <Line 
            name="دوره فعلی"
            type="monotone" 
            dataKey="current" 
            stroke="#3d2b1f" /* رنگ قهوه‌ای تیره تم */
            strokeWidth={3}
            dot={{ r: 4, fill: "#3d2b1f" }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GrowthChart;