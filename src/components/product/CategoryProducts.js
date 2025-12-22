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
        <h1 className="text-2xl font-bold text-black mb-4">
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
        <h2 className="text-[14px] font-[550] uppercase tracking-widest text-black mb-4">
          Bu Kategoride Henüz Ürün Bulunmuyor
        </h2>
      </div>
    );
  }

  const categoryName = products[0]?.category?.name || "Kategori";

  return (
    <div className="py-14">
      {/* Kategori Başlığı */}
      <div className="mb-10">
        <h1 className="text-[14px] font-[550] uppercase tracking-widest text-black mb-2">
          {categoryName}
        </h1>
      </div>

      {/* Ürün Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
        {products.map((product) => (
          <Link
            key={product._id}
            href={`/urun/${product.slug}`}
            className="group flex flex-col"
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
                    className={`object-contain p-10 ${
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
                      className="object-contain p-10 opacity-0 group-hover:opacity-100"
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
        ))}
      </div>
    </div>
  );
}
