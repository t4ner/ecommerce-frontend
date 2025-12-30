"use client";

import { useState, useEffect } from "react";
import { useBanners } from "@/hooks/banners/useBanners";
import Link from "next/link";
import Image from "next/image";

export default function Banner() {
  const { data: banners, isLoading } = useBanners();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Mobil kontrolü
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
      <div className="w-full h-[350px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] bg-gray-200 animate-pulse flex items-center justify-center rounded-lg mt-2 sm:mt-3 md:mt-4 lg:mt-5">
        <div className="text-gray-400 text-sm sm:text-base">Yükleniyor...</div>
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
    <div className="relative w-full h-[450px]  lg:h-[700px] lg:rounded-lg lg:mt-5 overflow-hidden group">
      {/* Banner Container - Slide Geçişi */}
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {banners.map((banner, index) => {
          const hasSlug = banner.slug?.trim();
          const isFirstBanner = index === 0;
          // Mobilde imageUrlMobile varsa onu kullan, yoksa imageUrl kullan
          const imageSrc = isMobile && banner.imageUrlMobile 
            ? banner.imageUrlMobile 
            : banner.imageUrl;
          
          return (
            <div key={banner._id} className="w-full shrink-0 relative">
              {hasSlug ? (
                <Link
                  href={`/${banner.slug.trim()}`}
                  className="block w-full h-full relative"
                >
                  <Image
                    src={imageSrc}
                    alt={banner.title || "Banner"}
                    width={1550}
                    height={700}
                    className="w-full h-full object-cover"
                    loading={isFirstBanner ? "eager" : "lazy"}
                    priority={isFirstBanner}
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
                </Link>
              ) : (
                <>
                  <Image
                    src={imageSrc}
                    alt={banner.title || "Banner"}
                    width={1550}
                    height={700}
                    className="w-full h-full object-contain sm:object-contain md:object-cover"
                    loading={isFirstBanner ? "eager" : "lazy"}
                    priority={isFirstBanner}
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
                  {banner.title && (
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 z-10">
                      <h2 className="text-white text-lg sm:text-xl md:text-2xl lg:text-4xl xl:text-5xl font-bold taanzera drop-shadow-lg">
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
            className="absolute left-2 sm:left-3 md:left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md cursor-pointer p-2 sm:p-2.5 md:p-3 rounded shadow-lg transition-all opacity-70 sm:opacity-0 sm:group-hover:opacity-100 hover:opacity-100 hover:scale-110 active:scale-95 z-10"
            aria-label="Önceki"
          >
            <Image
              src="/images/icons/arrow-left.svg"
              alt="arrow-left"
              width={20}
              height={20}
              className="sm:w-6 sm:h-6"
            />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 sm:right-3 md:right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md p-2 sm:p-2.5 md:p-3 cursor-pointer rounded shadow-lg transition-all opacity-70 sm:opacity-0 sm:group-hover:opacity-100 hover:opacity-100 hover:scale-110 active:scale-95 z-10"
            aria-label="Sonraki"
          >
            <Image
              src="/images/icons/arrow-right.svg"
              alt="arrow-right"
              width={20}
              height={20}
              className="sm:w-6 sm:h-6"
            />
          </button>
        </>
      )}

      {/* Nokta Göstergeleri */}
      {banners.length > 1 && (
        <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 z-10">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all rounded-full ${
                index === currentIndex
                  ? "w-6 sm:w-8 h-1.5 sm:h-2 bg-white"
                  : "w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Banner ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}