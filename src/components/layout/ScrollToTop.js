"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Route değişikliklerinde scroll'u en üste al
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    // Sayfa yüklendiğinde veya yenilendiğinde scroll'u en üste al
    window.scrollTo(0, 0);
    
    // Sayfa yüklendikten sonra da bir kez daha kontrol et (bazı durumlarda gerekli)
    const handleLoad = () => {
      window.scrollTo(0, 0);
    };
    
    window.addEventListener("load", handleLoad);
    
    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return null;
}

