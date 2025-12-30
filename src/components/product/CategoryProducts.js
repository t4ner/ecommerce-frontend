"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { useProductsByCategorySlug } from "@/hooks/products/useProductsByCategorySlug";

export default function CategoryProducts({ categorySlug }) {
  const {
    data: products,
    isLoading,
    isError,
  } = useProductsByCategorySlug(categorySlug);

  const productsList = useMemo(() => products || [], [products]);
  const categoryName = useMemo(
    () => productsList[0]?.category?.name || "Kategori",
    [productsList]
  );

  if (isLoading) {
    return (
      <div className="py-12 md:py-24 flex items-center justify-center px-4 md:px-0">
        <div className="w-6 h-6 md:w-8 md:h-8 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-12 md:py-24 text-center min-h-[60vh] px-4 md:px-0">
        <h1 className="text-lg md:text-2xl font-bold text-black mb-4">
          Ürünler Yüklenemedi
        </h1>
        <p className="text-xs md:text-sm text-gray-500">
          Ürünler yüklenirken bir hata oluştu.
        </p>
      </div>
    );
  }

  if (!productsList || productsList.length === 0) {
    return (
      <div className="py-12 md:py-24 text-center min-h-[60vh] px-4 md:px-0">
        <h2 className="text-[12px] md:text-[14px] font-[550] uppercase tracking-widest text-black mb-4">
          Bu Kategoride Henüz Ürün Bulunmuyor
        </h2>
      </div>
    );
  }

  return (
    <div className="py-8 md:py-14 px-4 md:px-0">
      {/* Kategori Başlığı */}
      <div className="mb-6 md:mb-10">
        <h1 className="text-[11px] md:text-[16px] font-medium uppercase tracking-widest text-black mb-2">
          {categoryName}
        </h1>
      </div>

      {/* Ürün Grid - Tekli-Çiftli Dizilim (Mobil), Normal (Büyük Ekran) */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
        {productsList.map((product, index) => {
          // Her 3 üründe bir pattern: tekli (col-span-2), sonra çiftli (col-span-1, col-span-1)
          // Sadece mobilde geçerli, büyük ekranlarda normal dizilim
          const patternIndex = index % 3;
          const isSingle = patternIndex === 0;

          return (
            <Link
              key={product._id}
              href={`/urun/${product.slug}`}
              className={`group flex flex-col ${
                isSingle ? "col-span-2 md:col-span-1" : "col-span-1"
              }`}
            >
              {/* Image */}
              <div className="relative aspect-square border border-gray-100 shadow-md w-full overflow-hidden rounded-lg mb-3 md:mb-3 bg-white">
                {product.images?.[0] ? (
                  <>
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 350px"
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
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 350px"
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
              <div className="flex flex-col gap-1.5 md:gap-2 px-1">
                <h3 className="uppercase text-[10px] md:text-[15px] font-medium tracking-widest text-black line-clamp-1">
                  {product.name}
                </h3>
                {/* Fiyat */}
                <div className="">
                  <span className="text-[11px] md:text-[15px] font-medium tracking-widest text-black">
                    {product.price},00TL
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
