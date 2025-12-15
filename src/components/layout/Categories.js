"use client";

import Image from "next/image";
import Link from "next/link";
import { useCategories } from "@/hooks/categories/useCategories";

export default function Categories() {
  const { data: categories, isLoading, isError } = useCategories();

  const visibleCategories = categories?.filter(
    (category) => category.isVisible === true
  );

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
      {/* Title */}
      <h2 className="text-[14px] font-[550] uppercase tracking-widest mb-15">
        Kategoriler
      </h2>

      {/* Categories */}

      <div className="flex gap-24">
        {visibleCategories?.map((category) => (
          <Link
            key={category._id}
            href={`/kategori/${category.slug}`}
            className="group flex flex-col items-center"
          >
            {/* Organic background with SVG icon */}
            <div className="relative w-40 h-40 flex items-center justify-center">
              {/* SVG Background */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src="/images/icons/icon.svg"
                  alt="category background"
                  width={160}
                  height={160}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Category Image */}
              {category.imageUrl ? (
                <Image
                  src={category.imageUrl}
                  alt={category.name}
                  width={120}
                  height={120}
                  className="relative z-10 object-contain transition-transform duration-300 group-hover:scale-110"
                />
              ) : null}
            </div>

            {/* Category name */}
            <span className="mt-5 text-center text-[12px] font-[550] uppercase tracking-widest text-gray-900">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
