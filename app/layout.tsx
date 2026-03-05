import Header from "@/app/common-components/Header";
import Footer from "@/app/common-components/Footer";
import "../styles/fonts.css";
import "../styles/bootstrap.min.css";
import "../styles/all.min.css";
import "../styles/docsmin.css";
import "../styles/slick.min.css";
import "../styles/slick-theme.min.css";

export const metadata = {
  title: "Aixtor Website",
  description: "Next.js + WordPress CMS Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "Arial, sans-serif" }}>
        <Header />

        <main style={{ padding: "40px" }}>{children}</main>

        <Footer />
      </body>
    </html>
  );
}