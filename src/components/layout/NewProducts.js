"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useNewProducts } from "@/hooks/products/useNewProducts";

export default function NewProducts() {
  const { data: products, isLoading, isError } = useNewProducts();
  const [sliderRef, sliderInstanceRef] = useKeenSlider({
    mode: "free-snap",
    slides: {
      perView: 3.5,
      spacing: 32,
    },
    rubberband: true,
  });

  useEffect(() => {
    sliderInstanceRef.current?.update();
  }, [products, sliderInstanceRef]);

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
      <div className="flex items-center justify-between mb-14">
        <h2 className="text-[14px] font-[550] uppercase tracking-widest text-gray-900">
          Yeni Ürünler
        </h2>
      </div>

      {/* Products */}
      <div className="relative">
        <div ref={sliderRef} className="keen-slider pb-4">
          {products?.length ? (
            products.map((product) => (
              <Link
                key={product._id}
                href={`/urun/${product.slug}`}
                className="keen-slider__slide group flex flex-col"
              >
                {/* Image */}
                <div className="relative w-[350px] h-[300px] bg-gray-100 overflow-hidden rounded-lg mb-5">
                  {product.images?.[0] ? (
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">
                      Görsel Yok
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex flex-col gap-2">
                  <h3 className="uppercase text-[13px] font-[550] tracking-wider text-gray-900">
                    {product.name}
                  </h3>
                  <p className="text-sm font-medium text-gray-700">
                    <span className="text-[13px] font-[550] tracking-wider text-gray-900">
                      ₺
                    </span>{" "}
                    {(product.price / 100).toFixed(2)}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center text-sm text-gray-400">
              Ürün bulunamadı
            </div>
          )}
        </div>

        {/* Navigation Arrows */}
        {products?.length > 0 && (
          <>
            <button
              onClick={() => sliderInstanceRef.current?.prev()}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-15 z-10 bg-white/20 backdrop-blur-md cursor-pointer p-2 rounded shadow-lg transition-all hover:scale-110"
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
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-15 z-10 bg-white/20 backdrop-blur-md cursor-pointer p-2 rounded shadow-lg transition-all hover:scale-110"
              aria-label="Sonraki ürünler"
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
