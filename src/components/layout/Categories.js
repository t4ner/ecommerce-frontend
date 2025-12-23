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
      perView: 5.6,
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
      {/* Header */}
      <div className="flex items-center gap-4 mb-10">
        <h2 className="text-[13px] font-[550] uppercase tracking-widest">
          Kategoriler
        </h2>

        {/* Navigation Arrows */}
        {visibleCategories?.length > 0 && (
          <div className="flex items-center space-x-3 gap-2 pl-5">
            <button
              onClick={() => sliderInstanceRef.current?.prev()}
              className="cursor-pointer p-2 rounded  transition-all hover:scale-110"
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
              className=" cursor-pointer p-2 rounded transition-all hover:scale-110"
              aria-label="Sonraki kategoriler"
            >
              <Image
                src="/images/icons/arrow-right.svg"
                alt="Sonraki"
                width={24}
                height={24}
              />
            </button>
          </div>
        )}
      </div>

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
              <div className="relative w-50 h-50 flex items-center justify-center">
                {/* Background Icon - Arka plan */}
                <Image
                  src="/images/icons/icon.svg"
                  alt="category background"
                  width={200}
                  height={200}
                  className="absolute inset-0 object-cover opacity-100"
                />

                {/* Category Image - Üstteki görsel */}
                {category.imageUrl ? (
                  <Image
                    src={category.imageUrl}
                    alt={category.name}
                    width={200}
                    height={200}
                    className="relative z-10 object-contain transition-transform duration-500 group-hover:scale-120"
                  />
                ) : null}
              </div>

              {/* Category Name */}
              <span className="mt-5 border border-gray-400 py-2 px-5 rounded-lg text-center text-[12px] font-[550] uppercase tracking-widest text-black">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
