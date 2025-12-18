"use client";

import Image from "next/image";
import Link from "next/link";
import { useProductsByCategorySlug } from "@/hooks/products/useProductsByCategorySlug";

export default function CategoryProducts({ categorySlug }) {
  const {
    data: products,
    isLoading,
    isError,
  } = useProductsByCategorySlug(categorySlug);

  if (isLoading) {
    return (
      <div className="py-24 flex items-center justify-center ">
        <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-24 text-center min-h-[60vh]">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Ürünler Yüklenemedi
        </h1>
        <p className="text-sm text-gray-500">
          Ürünler yüklenirken bir hata oluştu.
        </p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="py-24 text-center min-h-[60vh]">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Bu Kategoride Ürün Bulunamadı
        </h1>
        <p className="text-sm text-gray-500">
          Bu kategoride henüz ürün bulunmamaktadır.
        </p>
      </div>
    );
  }

  const categoryName = products[0]?.category?.name || "Kategori";

  return (
    <div className="pt-10">
      {/* Kategori Başlığı */}
      <div className="mb-10">
        <h1 className="text-[13px] font-[550] uppercase tracking-widest text-gray-900 mb-2">
          {categoryName}
        </h1>
      </div>

      {/* Ürün Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
        {products.map((product) => (
          <Link
            key={product._id}
            href={`/urun/${product.slug}`}
            className="group flex flex-col"
          >
            {/* Image */}
            <div className="relative border border-gray-100 shadow-md w-full aspect-square overflow-hidden rounded-lg mb-5">
              {product.images?.[0] ? (
                <>
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className={`object-cover p-3 transition-opacity duration-500 ${
                      product.images?.[1] ? "group-hover:opacity-0" : ""
                    }`}
                  />
                  {product.images?.[1] && (
                    <Image
                      src={product.images[1]}
                      alt={product.name}
                      fill
                      className="object-cover p-3 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
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
            <div className="flex flex-col gap-2 px-1">
              <h3 className="uppercase text-[13px] font-[550] tracking-widest text-gray-900 line-clamp-2">
                {product.name}
              </h3>
              <p className="text-[14px] font-medium font-[poppins] text-gray-700">
                <span className="text-[13px] font-medium tracking-wider text-gray-900">
                  ₺
                </span>{" "}
                {product.price},00
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
