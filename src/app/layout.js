import "../styles/globals.css";
import { IBM_Plex_Sans, Montserrat } from "next/font/google";
import { Poppins } from "next/font/google";
import { Raleway } from "next/font/google";
import { Rubik } from "next/font/google";
import { Merriweather } from "next/font/google";
import { IBM_Plex_Sans_Thai_Looped } from "next/font/google";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import TopBar from "@/components/layout/TopBar";
import Footer from "@/components/layout/Footer";
import CartSidebar from "@/components/cart/CartSidebar";
import ScrollToTop from "@/components/layout/ScrollToTop";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans",
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-raleway",
});

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-rubik",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-merriweather",
});

const ibmPlexSansThaiLooped = IBM_Plex_Sans_Thai_Looped({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans-thai-looped",
});

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

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body
        className={`${ibmPlexSans.variable} ${raleway.variable} ${rubik.variable} ${merriweather.variable} ${ibmPlexSansThaiLooped.variable} font-[Montserrat]`}
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
