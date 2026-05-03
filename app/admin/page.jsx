"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/admin")
      .then(res => res.json())
      .then(setData);
  }, []);

  // 💰 คำนวณ
  const today = new Date().toLocaleDateString();
  const totalToday = data
    .filter(d => d.booking_date === today)
    .reduce((sum, d) => sum + (d.total || 0), 0);

  const totalAll = data.reduce((sum, d) => sum + (d.total || 0), 0);

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      
      <h1 style={{ fontSize: 28 }}>🏠 บ้านแฮปปี้ Dashboard</h1>

      {/* 💰 Summary */}
      <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
        
        <div style={card}>
          <h3>💰 รายได้วันนี้</h3>
          <p style={big}>{totalToday} บาท</p>
        </div>

        <div style={card}>
          <h3>📊 รายได้ทั้งหมด</h3>
          <p style={big}>{totalAll} บาท</p>
        </div>

        <div style={card}>
          <h3>📅 จำนวนการจอง</h3>
          <p style={big}>{data.length} รายการ</p>
        </div>

      </div>

      {/* 📋 ตาราง */}
      <h2 style={{ marginTop: 30 }}>📋 รายการจอง</h2>

      <table style={{ width: "100%", marginTop: 10 }}>
        <thead>
          <tr>
            <th>รหัส</th>
            <th>วันที่</th>
            <th>บริการ</th>
            <th>ราคา</th>
          </tr>
        </thead>
        <tbody>
          {data.map((b) => (
            <tr key={b.id}>
              <td>{b.booking_code}</td>
              <td>{b.booking_date}</td>
              <td>{b.service_type}</td>
              <td>{b.total} บาท</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// 🎨 style
const card = {
  flex: 1,
  padding: 20,
  borderRadius: 16,
  background: "#fff5f5",
  boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
};

const big = {
  fontSize: 22,
  fontWeight: "bold"
};
