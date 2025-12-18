"use client";

import { use } from "react";
import { useProductBySlug } from "@/hooks/products/useProductBySlug";
import ProductDetail from "@/components/product/ProductDetail";

export default function ProductPage({ params }) {
  const { slug } = use(params);
  const { data: product, isLoading, isError } = useProductBySlug(slug);

  if (isLoading) {
    return (
      <div className="py-24 flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="py-24 text-center min-h-[60vh]">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Ürün Bulunamadı
        </h1>
        <p className="text-sm text-gray-500">
          Aradığınız ürün bulunamadı veya yüklenirken bir hata oluştu.
        </p>
      </div>
    );
  }

  return <ProductDetail product={product} />;
}
