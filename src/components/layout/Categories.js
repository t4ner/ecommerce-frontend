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
      perView: 1.7,
      spacing: 16,
    },
    breakpoints: {
      "(min-width: 640px)": {
        slides: {
          perView: 2.5,
          spacing: 18,
        },
      },

      "(min-width: 1024px)": {
        slides: {
          perView: 4.5,
          spacing: 48,
        },
      },
      "(min-width: 1280px)": {
        slides: {
          perView: 4.9,
          spacing: 70,
        },
      },
    },
    rubberband: true,
  });

  useEffect(() => {
    sliderInstanceRef.current?.update();
  }, [visibleCategories, sliderInstanceRef]);

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
    <section className="px-4 md:px-0">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-6 sm:mb-8 lg:mb-10">
        <h2 className="text-[14px] lg:text-[17px] font-medium uppercase tracking-widest">
          Kategoriler
        </h2>

        {visibleCategories?.length > 0 && (
          <div className="hidden lg:flex items-center gap-2 sm:gap-3 pl-3 sm:pl-5">
            <button
              onClick={() => sliderInstanceRef.current?.prev()}
              className="bg-white/20 backdrop-blur-md cursor-pointer p-2 sm:p-2.5 md:p-3 rounded shadow-lg transition-all opacity-70 hover:opacity-100 hover:scale-110 active:scale-95"
              aria-label="Önceki kategori"
            >
              <Image
                src="/images/icons/arrow-left.svg"
                alt="Önceki"
                width={20}
                height={20}
                className="sm:w-6 sm:h-6"
              />
            </button>
            <button
              onClick={() => sliderInstanceRef.current?.next()}
              className="bg-white/20 backdrop-blur-md p-2 sm:p-2.5 md:p-3 cursor-pointer rounded shadow-lg transition-all opacity-70 hover:opacity-100 hover:scale-110 active:scale-95"
              aria-label="Sonraki kategori"
            >
              <Image
                src="/images/icons/arrow-right.svg"
                alt="Sonraki"
                width={20}
                height={20}
                className="sm:w-6 sm:h-6"
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
            <div className="relative flex items-center justify-center w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] md:w-[260px] md:h-[260px] lg:w-[300px] lg:h-[300px] xl:w-[340px] xl:h-[340px]">
              {/* Background Icon */}
              <Image
                src="/images/icons/icon.svg"
                alt="category background"
                width={120}
                height={120}
                className="absolute object-contain w-[220px] h-[220px] sm:w-[150px]  lg:w-[210px] lg:h-[210px] xl:w-[230px] xl:h-[230px]"
              />

              {/* Category Image */}
              {category.imageUrl && (
                <Image
                  src={category.imageUrl}
                  alt={category.name}
                  width={160}
                  height={160}
                  className="relative z-10 object-contain transition-transform duration-500 group-hover:scale-110 w-[250px] h-[250px] sm:w-[190px] sm:h-[190px] md:w-[230px] md:h-[230px] lg:w-[270px] lg:h-[270px] xl:w-[300px] xl:h-[300px]"
                />
              )}
            </div>

            {/* Category Name */}
            <span className="border border-gray-400 py-1.5 px-3 sm:py-2 sm:px-4 lg:px-5 rounded-lg text-center text-[12px] lg:text-[14px] font-medium uppercase tracking-widest mt-2 sm:mt-3">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
