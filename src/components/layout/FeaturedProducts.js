"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useFeaturedProducts } from "@/hooks/products/useFeaturedProducts";
import { useCategories } from "@/hooks/categories/useCategories";

export default function FeaturedProducts() {
  const { data: products, isLoading, isError } = useFeaturedProducts();
  const { data: categories } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const sliderKey = useMemo(
    () => selectedCategory || "all",
    [selectedCategory]
  );
  const [sliderRef, sliderInstanceRef] = useKeenSlider({
    mode: "free-snap",
    slides: {
      perView: 1.5,
      spacing: 16,
    },
    breakpoints: {
      "(min-width: 640px)": {
        slides: {
          perView: 1.5,
          spacing: 20,
        },
      },
      "(min-width: 768px)": {
        slides: {
          perView: 2.2,
          spacing: 24,
        },
      },
      "(min-width: 1024px)": {
        slides: {
          perView: 3.5,
          spacing: 24,
        },
      },
    },
    rubberband: true,
  });

  const mainCategories = useMemo(
    () => categories?.filter((category) => category.parentId === null) || [],
    [categories]
  );

  useEffect(() => {
    if (mainCategories?.length && selectedCategory === null) {
      setSelectedCategory(mainCategories[0]._id);
    }
  }, [mainCategories, selectedCategory]);

  const filteredProducts = useMemo(
    () =>
      selectedCategory
        ? products?.filter(
            (product) => product.category?._id === selectedCategory
          ) || []
        : products || [],
    [products, selectedCategory]
  );

  useEffect(() => {
    sliderInstanceRef.current?.update();
  }, [filteredProducts, sliderInstanceRef]);

  if (isLoading) {
    return (
      <section className="py-12 md:py-24 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-12 md:py-24 text-center text-sm text-red-500">
        Ürünler yüklenemedi
      </section>
    );
  }

  return (
    <section className="px-4 md:px-0">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0 mb-6 md:mb-10">
        <div className="flex items-center gap-2 md:gap-4">
          <h2 className="text-[13px] lg:text-[17px] font-medium uppercase tracking-widest">
            Öne Çıkan Ürünler
          </h2>

          {/* Navigation Arrows */}
          {filteredProducts?.length > 0 && (
            <div className="hidden sm:flex items-center space-x-3 gap-2 pl-3 md:pl-5">
              <button
                onClick={() => sliderInstanceRef.current?.prev()}
                className="cursor-pointer p-2 rounded transition-all hover:scale-110"
                aria-label="Önceki ürünler"
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
                className="cursor-pointer p-2 rounded transition-all hover:scale-110"
                aria-label="Sonraki ürünler"
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

        {mainCategories?.length > 0 && (
          <div className="flex gap-3 md:gap-6 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {mainCategories.slice(0, 5).map((category) => (
              <button
                key={category._id}
                onClick={() => setSelectedCategory(category._id)}
                className={`relative text-[12px] lg:text-[16px] cursor-pointer font-medium tracking-widest uppercase transition-colors whitespace-nowrap after:absolute after:left-0 after:-bottom-1 after:h-0.25 after:bg-black after:transition-all ${
                  selectedCategory === category._id
                    ? "text-black after:w-full"
                    : "text-gray-400 hover:text-gray-700 after:w-0"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Products */}
      <div className="relative">
        <div key={sliderKey} ref={sliderRef} className="keen-slider pb-4">
          {filteredProducts?.length ? (
            filteredProducts.map((product, index) => (
              <Link
                key={product._id}
                href={`/urun/${product.slug}`}
                className="keen-slider__slide group flex flex-col"
              >
                {/* Image */}
                <div className="relative border border-gray-400 shadow-md w-full aspect-square max-w-[350px] mx-auto overflow-hidden rounded-lg mb-2 md:mb-3 bg-white">
                  {product.images?.[0] ? (
                    <>
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 350px"
                        className={`object-contain transition-opacity duration-300 ${
                          product.images?.[1] ? "group-hover:opacity-0" : ""
                        }`}
                        loading="lazy"
                      />
                      {product.images?.[1] && (
                        <Image
                          src={product.images[1]}
                          alt={product.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 350px"
                          className="object-contain opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        />
                      )}
                    </>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">
                      Görsel Yok
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex flex-col gap-1.5 md:gap-2 w-full max-w-[350px] mx-auto ">
                  <h3 className="uppercase  text-[11px] lg:text-[15px] font-medium tracking-widest text-black line-clamp-1">
                    {product.name}
                  </h3>
                  {/* Fiyat */}
                  <div className="flex items-center gap-x-5">
                    <div className="flex items-center gap-1.5">
                     
                      <span className="text-[13px] lg:text-[15px] font-medium tracking-widest text-black">
                        {product.price},00TL
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center text-sm text-gray-400 py-8">
              Ürün bulunamadı
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
