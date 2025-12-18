"use client";

import Link from "next/link";
import Image from "next/image";
import { useCategories } from "@/hooks/categories/useCategories";

export default function Footer() {
  const { data: categories } = useCategories();

  // Ana kategorileri al (parentId: null olanlar)
  const mainCategories = categories
    ?.filter((category) => category.parentId === null)
    ?.slice(0, 5); // İlk 5 kategoriyi al

  const legalLinks = [
    { name: "HAKKIMIZDA", href: "/hakkimizda" },
    { name: "İLETİŞİM", href: "/iletisim" },
    { name: "İADE KOŞULLARI", href: "/iade-kosullari" },
    { name: "SATIŞ SÖZLEŞMESİ", href: "/satis-sozlesmesi" },
    { name: "KVKK METNİ", href: "/kvkk" },
    { name: "TİCARİ ELEKTRONİK İLETİ ONAYI", href: "/ticari-elektronik-ileti" },
  ];

  return (
    <footer className="pt-14 mt-12 bg-black text-white">
      <div className="container mx-auto">

        {/* Second Row - Categories */}
        <div className="flex flex-wrap items-center justify-center gap-4 py-4 border-t border-gray-400">
          {mainCategories && mainCategories.length > 0 ? (
            mainCategories.map((category, index) => (
              <span key={category._id} className="flex items-center">
                <Link
                  href={`/kategori/${category.slug}`}
                  className="text-[11px] font-[550] uppercase tracking-widest transition-colors hover:text-gray-900"
                >
                  {category.name}
                </Link>
                {index < mainCategories.length - 1 && (
                  <span className="mx-2 text-gray-400">•</span>
                )}
              </span>
            ))
          ) : (
            <div className="flex gap-4">
              {[
                "KATEGORİ 1",
                "KATEGORİ 2",
                "KATEGORİ 3",
                "KATEGORİ 4",
                "KATEGORİ 5",
              ].map((cat, index) => (
                <span key={cat} className="flex items-center">
                  <span className="text-[11px] font-[550] uppercase tracking-widest">
                    {cat}
                  </span>
                  {index < 4 && <span className="mx-2 text-gray-400">•</span>}
                </span>
              ))}
            </div>
          )}
        </div>
        {/* First Row - Legal Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 py-4 border-y border-gray-400">
          {legalLinks.map((link, index) => (
            <span key={link.name} className="flex items-center">
              <Link
                href={link.href}
                className="text-[11px] font-[550] uppercase tracking-widest transition-colors hover:text-gray-900"
              >
                {link.name}
              </Link>
              {index < legalLinks.length - 1 && (
                <span className="mx-2 text-gray-300">•</span>
              )}
            </span>
          ))}
        </div>


        {/* Bottom Section - Logo, Attribution, Social */}
        <div className="pt-10">
          <div className="flex items-center justify-between">
            {/* Logo - Left */}
            <div>
              <Link href="/" className="cursor-pointer">
                <Image
                  src="/images/logo/logo.webp"
                  alt="logo"
                  width={80}
                  height={80}
                  loading="lazy"
                />
              </Link>
            </div>

            {/* Attribution - Center */}
            <div className="text-center">
              <p className="text-[11px] font-[550] uppercase tracking-widest">
                Taanzera E-Ticaret Altyapısı ile Hazırlanmıştır.
              </p>
            </div>

            {/* Instagram - Right */}
            <div>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-[550] uppercase tracking-widest"
              >
                Instagram
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
