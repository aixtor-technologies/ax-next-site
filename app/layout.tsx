import type { ReactNode } from "react";
import Header from "@/app/common-components/Header";
import Footer from "@/app/common-components/Footer";
import "./globals.css";
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
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main style={{ padding: "0px!important" }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
