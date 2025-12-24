"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useCategories } from "@/hooks/categories/useCategories";

// 🔧 BOYUT KONTROLLERİ
const CONTAINER_SIZE = 340;     // Genel alan
const BG_ICON_SIZE = 230;       // icon.svg boyutu
const CATEGORY_IMAGE_SIZE = 300; // category.imageUrl boyutu

export default function Categories() {
  const { data: categories, isLoading, isError } = useCategories();

  const visibleCategories = categories?.filter(
    (category) => category.isVisible === true
  );

  const [sliderRef, sliderInstanceRef] = useKeenSlider({
    mode: "free-snap",
    slides: {
      perView: 4.9,
      spacing: 70,
    },
    rubberband: true,
  });

  useEffect(() => {
    sliderInstanceRef.current?.update();
  }, [visibleCategories]);

  if (isLoading) {
    return (
      <section className="py-20 text-center text-gray-500">
        Loading categories...
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-20 text-center text-red-500">
        Categories could not be loaded
      </section>
    );
  }

  return (
    <section>
      {/* Header */}
      <div className="flex items-center gap-4 mb-10">
        <h2 className="text-[14px] font-[550] uppercase tracking-widest">
          Kategoriler
        </h2>

        {visibleCategories?.length > 0 && (
          <div className="flex items-center gap-3 pl-5">
            <button onClick={() => sliderInstanceRef.current?.prev()}>
              <Image
                src="/images/icons/arrow-left.svg"
                alt="Önceki"
                width={24}
                height={24}
              />
            </button>
            <button onClick={() => sliderInstanceRef.current?.next()}>
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

      {/* Categories Slider */}
      <div ref={sliderRef} className="keen-slider pb-4">
        {visibleCategories?.map((category) => (
          <Link
            key={category._id}
            href={`/kategori/${category.slug}`}
            className="keen-slider__slide group flex flex-col items-center"
          >
            {/* Görsel Alan */}
            <div
              style={{ width: CONTAINER_SIZE, height: CONTAINER_SIZE }}
              className="relative flex items-center justify-center"
            >
              {/* Background Icon */}
              <Image
                src="/images/icons/icon.svg"
                alt="category background"
                width={BG_ICON_SIZE}
                height={BG_ICON_SIZE}
                className="absolute object-contain"
              />

              {/* Category Image */}
              {category.imageUrl && (
                <Image
                  src={category.imageUrl}
                  alt={category.name}
                  width={CATEGORY_IMAGE_SIZE}
                  height={CATEGORY_IMAGE_SIZE}
                  className="relative z-10 object-contain transition-transform duration-500 group-hover:scale-110"
                />
              )}
            </div>

            {/* Category Name */}
            <span className=" border border-gray-400 py-2 px-5 rounded-lg text-center text-[12px] font-[550] uppercase tracking-widest">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
