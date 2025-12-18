"use client";

import { use } from "react";
import CategoryProducts from "@/components/product/CategoryProducts";

export default function CategoryPage({ params }) {
  const { slug } = use(params);

  return <CategoryProducts categorySlug={slug} />;
}
