import type { ReactNode } from "react";
import { Suspense } from "react";
import { safeFetchMenu } from "@/lib/api";
import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
import PageLoader from "@/app/components/layout/PageLoader";
import "./globals.css";
import "../styles/fonts.css";
import "../styles/bootstrap.min.css";
import "../styles/all.min.css";
import "../styles/docsmin.css";
import "../styles/slick.min.css";
import "../styles/slick-theme.min.css";


export const metadata = {
  title: "Enterprise Software &amp; Liferay Portal Development Company | Aixtor",
  description: "Aixtor is a trusted enterprise software and Liferay portal development company delivering scalable intranet, customer, partner, and digital experience platforms for global enterprises.",
  icons: {
    icon: "/assets/images/AX-logo.svg",
    apple: "/assets/images/AX-logo.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const menu = await safeFetchMenu([]);

  return (
    <html lang="en">
      <body>
        <Suspense fallback={null}>
          <PageLoader />
        </Suspense>
        <Header menu={menu} />
        <div className="middle-content">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
