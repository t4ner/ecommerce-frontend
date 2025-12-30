"use client";

import Link from "next/link";
import Image from "next/image";
import { useCategories } from "@/hooks/categories/useCategories";
import { useState } from "react";

export default function Navbar() {
  const { data: categories, isLoading, isError } = useCategories();
  const [hoveredCategory, setHoveredCategory] = useState(null);

  // Tree yapısından sadece ana kategorileri filtrele
  // Sadece parent kategorileri (parentId: null) göster, children'ları gösterme
  const visibleCategories = categories?.filter(
    (category) => category.parentId === null
  );

  const hasChildren = (category) => {
    return category.children && category.children.length > 0;
  };

  return (
    <nav className="hidden  container mx-auto lg:flex justify-center border-y border-gray-400 py-5">
      {isLoading ? (
        <div className="text-sm text-gray-500">Yükleniyor...</div>
      ) : isError ? (
        <div className="text-sm text-red-500">Hata oluştu</div>
      ) : (
        <ul className="flex items-center gap-20 text-[14px] lg:text-[15px] font-medium uppercase tracking-widest">
          {visibleCategories && visibleCategories.length > 0 ? (
            visibleCategories.map((category) => (
              <li
                key={category._id}
                className="relative"
                onMouseEnter={() =>
                  hasChildren(category) && setHoveredCategory(category._id)
                }
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <div className="flex items-center gap-1">
                  <Link
                    href={`/kategori/${category.slug}`}
                    className="transition-colors hover:text-black"
                  >
                    {category.name}
                  </Link>
                  {hasChildren(category) && (
                    <Image
                      src="/images/icons/arrow-bottom.svg"
                      alt="arrow"
                      width={15}
                      height={15}
                      className="transition-transform"
                    />
                  )}
                </div>

                {hasChildren(category) && hoveredCategory === category._id && (
                  <div
                    className="absolute left-8 top-full pt-8 bg-transparent z-50"
                    onMouseEnter={() => setHoveredCategory(category._id)}
                    onMouseLeave={() => setHoveredCategory(null)}
                  >
                    <div className="bg-white border border-gray-400  rounded-md py-2 min-w-[300px]">
                      <ul className="flex flex-col">
                        {category.children.map((child) => (
                          <li key={child._id}>
                            <Link
                              href={`/kategori/${child.slug}`}
                              className="block px-4 py-3 text-[12px] font-[550] uppercase tracking-widest transition-colors hover:bg-gray-50 hover:text-black"
                            >
                              {child.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </li>
            ))
          ) : (
            <li className="text-sm text-gray-500">Kategori bulunamadı</li>
          )}
        </ul>
      )}
    </nav>
  );
}
