export const metadata = {
  title: "บ้านแฮปปี้",
  description: "Dog daycare"
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body style={{ fontFamily: "sans-serif", background: "#fefaf6" }}>
        {children}
      </body>
    </html>
  );
}
