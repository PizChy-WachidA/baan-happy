export default function Home() {
  return (
    <main style={{ padding: 24, textAlign: "center" }}>
      <h1 style={{ fontSize: 32 }}>🐶 บ้านแฮปปี้</h1>
      <p>รับฝากน้องหมาพันธุ์เล็ก ดูแลเหมือนลูก 💛</p>

      <div style={{ marginTop: 30 }}>
        <a href="#" style={btn}>📅 จองบริการ</a>
      </div>

      <div style={{ marginTop: 15 }}>
        <a href="#" style={btn}>📝 ลงทะเบียนน้องหมา</a>
      </div>

      <div style={{ marginTop: 15 }}>
        <a href="https://line.me" target="_blank" style={btn}>
          💬 ติดต่อทาง LINE
        </a>
      </div>
    </main>
  );
}

const btn = {
  display: "block",
  padding: "12px 20px",
  margin: "0 auto",
  width: 220,
  background: "#ffb6b9",
  color: "#fff",
  borderRadius: 12,
  textDecoration: "none",
  fontWeight: "bold"
};
