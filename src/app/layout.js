import "../styles/globals.css";
import { Rubik, Montserrat } from "next/font/google";
import { Genos } from "next/font/google";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import TopBar from "@/components/layout/TopBar";
import Footer from "@/components/layout/Footer";
import CartSidebar from "@/components/cart/CartSidebar";
import ScrollToTop from "@/components/layout/ScrollToTop";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-rubik",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});

const genos = Genos({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-genos",
});

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body
        className={` ${rubik.variable} ${montserrat.variable} ${genos.variable} font-[Genos]`}
      >
        <ReactQueryProvider>
          <ScrollToTop />
          <TopBar />
          <Header />
          <Navbar />
          <main className="container mx-auto">{children}</main>
          <Footer />
          <CartSidebar />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
