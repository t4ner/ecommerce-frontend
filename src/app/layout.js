import "../styles/globals.css";
import { Montserrat } from "next/font/google";
import { Poppins } from "next/font/google";
import { Inter } from "next/font/google"; 
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import TopBar from "@/components/layout/TopBar";
import Footer from "@/components/layout/Footer";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body
        className={`${montserrat.variable} ${poppins.variable} ${inter.variable} font-[Montserrat]`}
      >
        <ReactQueryProvider>
          <TopBar />
          <Header />
          <Navbar />
          <main className="container mx-auto">{children}</main>
          <Footer />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
