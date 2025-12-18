"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useCategories } from "@/hooks/categories/useCategories";

export default function Categories() {
  const { data: categories, isLoading, isError } = useCategories();

  const visibleCategories = categories?.filter(
    (category) => category.isVisible === true
  );

  const [sliderRef, sliderInstanceRef] = useKeenSlider({
    mode: "free-snap",
    slides: {
      perView: "auto",
      spacing: 70,
    },
    rubberband: true,
  });

  useEffect(() => {
    sliderInstanceRef.current?.update();
  }, [visibleCategories, sliderInstanceRef]);

  if (isLoading) {
    return (
      <section className="py-20 text-center">
        <p className="text-gray-500">Loading categories...</p>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-20 text-center">
        <p className="text-red-500">Categories could not be loaded</p>
      </section>
    );
  }

  return (
    <section>
      {/* Title */}
      <h2 className="text-[15px] font-[550] uppercase tracking-widest mb-10">
        Kategoriler
      </h2>

      {/* Categories */}
      <div className="relative">
        <div ref={sliderRef} className="keen-slider pb-4">
          {visibleCategories?.map((category) => (
            <Link
              key={category._id}
              href={`/kategori/${category.slug}`}
              className="keen-slider__slide group flex flex-col items-center"
            >
              {/* Category Container */}
              <div className="relative w-64 h-56 flex items-center justify-center">
                {/* Background Icon - Arka plan */}
                <Image
                  src="/images/icons/icon.svg"
                  alt="category background"
                  width={224}
                  height={224}
                  className="absolute inset-0 w-full h-full object-contain opacity-100"
                  
                />

                {/* Category Image - Üstteki görsel */}
                {category.imageUrl ? (
                  <Image
                    src={category.imageUrl}
                    alt={category.name}
                    width={180}
                    height={180}
                    className="relative z-10 object-contain transition-transform duration-300 group-hover:scale-110"

                  />
                ) : null}
              </div>

              {/* Category Name */}
              <span className="mt-5 border border-gray-200 py-2 px-5 rounded-lg text-center text-[12px] font-[550] uppercase tracking-widest text-black">
                {category.name}
              </span>
            </Link>
          ))}
        </div>

        {/* Navigation Arrows */}
        {visibleCategories?.length > 0 && (
          <>
            <button
              onClick={() => sliderInstanceRef.current?.prev()}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-15 z-10 bg-white/20 backdrop-blur-md cursor-pointer p-2 rounded shadow-lg transition-all hover:scale-110"
              aria-label="Önceki kategoriler"
            >
              <Image
                src="/images/icons/arrow-left.svg"
                alt="Önceki"
                width={24}
                height={24}
              />
            </button>
            <button
              onClick={() => sliderInstanceRef.current?.next()}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-15 z-10 bg-white/20 backdrop-blur-md cursor-pointer p-2 rounded shadow-lg transition-all hover:scale-110"
              aria-label="Sonraki kategoriler"
            >
              <Image
                src="/images/icons/arrow-right.svg"
                alt="Sonraki"
                width={24}
                height={24}
              />
            </button>
          </>
        )}
      </div>
    </section>
  );
}
