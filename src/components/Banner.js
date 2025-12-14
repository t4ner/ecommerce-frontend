"use client";

import { useState, useEffect } from "react";
import { useBanners } from "@/hooks/banners/useBanners";
import Link from "next/link";
import Image from "next/image";

export default function Banner() {
  const { data: banners, isLoading } = useBanners();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Otomatik geçiş
  useEffect(() => {
    if (!banners || banners.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [banners]);

  if (isLoading) {
    return (
      <div className="w-full h-[500px] bg-gray-200 animate-pulse flex items-center justify-center rounded-lg mt-5">
        <div className="text-gray-400">Yükleniyor...</div>
      </div>
    );
  }

  if (!banners || banners.length === 0) {
    return null;
  }

  const goToSlide = (index) => setCurrentIndex(index);
  const goToPrevious = () =>
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  const goToNext = () => setCurrentIndex((prev) => (prev + 1) % banners.length);

  return (
    <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] rounded-lg mt-5 overflow-hidden group">
      {/* Banner Container - Slide Geçişi */}
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {banners.map((banner) => {
          const hasSlug = banner.slug?.trim();
          return (
            <div key={banner._id} className="w-full shrink-0 relative">
              {hasSlug ? (
                <Link
                  href={`/${banner.slug.trim()}`}
                  className="block w-full h-full relative"
                >
                  <Image
                    src={banner.imageUrl}
                    alt={banner.title || "Banner"}
                    width={1000}
                    height={1000}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
                </Link>
              ) : (
                <>
                  <Image
                    src={banner.imageUrl}
                    alt={banner.title || "Banner"}
                    width={1000}
                    height={1000}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
                  {banner.title && (
                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 z-10">
                      <h2 className="text-white text-2xl md:text-4xl lg:text-5xl font-bold taanzera drop-shadow-lg">
                        {banner.title}
                      </h2>
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Ok Butonları */}
      {banners.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md cursor-pointer p-3 rounded shadow-lg transition-all opacity-0 group-hover:opacity-100 hover:scale-110 z-10"
            aria-label="Önceki"
          >
            <Image
              src="/images/icons/arrow-left.svg"
              alt="arrow-left"
              width={24}
              height={24}
            />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md p-3 cursor-pointer rounded shadow-lg transition-all opacity-0 group-hover:opacity-100 hover:scale-110 z-10"
            aria-label="Sonraki"
          >
            <Image
              src="/images/icons/arrow-right.svg"
              alt="arrow-right"
              width={24}
              height={24}
            />
          </button>
        </>
      )}

      {/* Nokta Göstergeleri */}
      {banners.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all rounded-full ${
                index === currentIndex
                  ? "w-8 h-2 bg-white"
                  : "w-2 h-2 bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Banner ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
