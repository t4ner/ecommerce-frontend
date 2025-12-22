"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useNewProducts } from "@/hooks/products/useNewProducts";

export default function NewProducts() {
  const { data: products, isLoading, isError } = useNewProducts();
  const [sliderRef, sliderInstanceRef] = useKeenSlider({
    mode: "free-snap",
    slides: {
      perView: 3.5,
    },
    rubberband: true,
  });

  const productsList = useMemo(() => products || [], [products]);

  useEffect(() => {
    sliderInstanceRef.current?.update();
  }, [productsList, sliderInstanceRef]);

  if (isLoading) {
    return (
      <section className="py-24 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-24 text-center text-sm text-red-500">
        Ürünler yüklenemedi
      </section>
    );
  }

  return (
    <section>
      {/* Header */}
      <div className="flex items-center gap-4 mb-10">
        <h2 className="text-[15px] font-[550] uppercase tracking-widest text-black">
          Yeni Ürünler
        </h2>

        {/* Navigation Arrows */}
        {productsList?.length > 0 && (
          <div className="flex items-center space-x-3  gap-2 pl-5">
            <button
              onClick={() => sliderInstanceRef.current?.prev()}
              className="cursor-pointer p-2 rounded  transition-all hover:scale-110"
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
              className=" cursor-pointer p-2 rounded transition-all hover:scale-110"
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

      {/* Products */}
      <div className="relative">
        <div ref={sliderRef} className="keen-slider pb-4">
          {productsList?.length ? (
            productsList.map((product, index) => (
              <Link
                key={product._id}
                href={`/urun/${product.slug}`}
                className="keen-slider__slide group flex flex-col"
              >
                {/* Image */}
                <div className="relative border border-gray-100 shadow-md w-[350px] h-[300px] overflow-hidden rounded-lg mb-5 bg-white">
                  {product.images?.[0] ? (
                    <>
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        sizes="350px"
                        className={`object-contain p-12 ${
                          product.images?.[1] ? "group-hover:opacity-0" : ""
                        }`}
                        loading="lazy"
                      />
                      {product.images?.[1] && (
                        <Image
                          src={product.images[1]}
                          alt={product.name}
                          fill
                          sizes="350px"
                          className="object-contain p-12 opacity-0 group-hover:opacity-100"
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
                <div className="flex flex-col gap-2 w-[350px]">
                  <h3 className="uppercase text-[13px] font-[550] tracking-widest text-black line-clamp-1">
                    {product.name}
                  </h3>
                  {/* Fiyat */}
                  <div className="flex items-end gap-x-5">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-[13px] font-semibold tracking-wider">
                        ₺
                      </span>
                      <span className="text-[14px] font-[Rubik] font-medium tracking-wider text-black">
                        {product.price},00
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center text-sm text-gray-400">
              Ürün bulunamadı
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
