import "../styles/globals.css";
import { Montserrat } from "next/font/google";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className="font-[montserrat]">
        <ReactQueryProvider>
          <Header />
          <Navbar />
          <main className="container mx-auto">{children}</main>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
