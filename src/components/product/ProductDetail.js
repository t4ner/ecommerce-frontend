"use client";

import { useState, useMemo } from "react";
import Image from "next/image";

export default function ProductDetail({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  // Her ürün için 1-15 arasında rastgele sayı
  const randomCount = useMemo(() => {
    return Math.floor(Math.random() * 10) + 1;
  }, [product._id]);
  return (
    <div className="py-8 lg:pt-10">
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-8 lg:gap-16">
        {/* Sol Taraf - Görseller (Sayfa scroll'u ile kayar) */}
        <div className="space-y-4 lg:col-span-4">
          {/* Ana Görseller - Normal akışta, sayfa scroll'u ile kayar */}
          {product.images?.length > 0 ? (
            product.images.map((image, index) => (
              <div
                key={index}
                className="relative border border-gray-100 shadow-md w-full aspect-square overflow-hidden rounded-lg group cursor-zoom-in"
              >
                <Image
                  src={image}
                  alt={`${product.name} - Görsel ${index + 1}`}
                  fill
                  className="object-cover p-6 transition-transform duration-500 ease-in-out group-hover:scale-125"
                  priority={index === 0}
                />
              </div>
            ))
          ) : (
            <div className="relative border border-gray-100 shadow-md w-full aspect-square overflow-hidden rounded-lg">
              <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-400">
                Görsel Yok
              </div>
            </div>
          )}
        </div>

        {/* Sağ Taraf - Ürün Bilgileri (Sticky - Sabit kalır) */}
        <div className="lg:sticky lg:top-24 lg:self-start lg:col-span-3">
          <div className="flex flex-col space-y-6">
            {/* Kategori */}
            <div className="flex items-center gap-2">
              {product.category && (
                <div className="text-[12px] font-medium uppercase tracking-widest text-gray-500">
                  {product.category.name}
                </div>
              )}
              {product.subCategory && (
                <>
                  <span className="text-[12px] font-[550] text-gray-400">
                    /
                  </span>
                  <div className="text-[12px] font-[550] uppercase tracking-widest text-gray-500">
                    {product.subCategory.name}
                  </div>
                </>
              )}
            </div>

            {/* Ürün Adı */}
            <h1 className="text-[20px]  font-[550] text-gray-900 uppercase tracking-widest">
              {product.name}
            </h1>

            {/* Fiyat */}
            <div className="flex items-end gap-x-5">
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-semibol tracking-wider">₺</span>
                <span className="text-4xl font-[Rubik] font-light tracking-wide text-gray-900">
                  {product.price}
                </span>
                <span className="text-xl font-[Merriweather] font-light text-gray-600">
                  . 00 
                </span>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-medium uppercase tracking-widest text-gray-500">
                Adet
              </label>
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden shadow-sm w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1 || product.stock === 0}
                  className="px-5 py-2 text-gray-700 hover:bg-gray-50 hover:text-gray-900 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-all duration-200 flex items-center justify-center min-w-[44px]"
                  aria-label="Azalt"
                >
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M20 12H4"
                    />
                  </svg>
                </button>
                <div className="py-3 border-x border-gray-200 bg-white max-w-[80px]">
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 1;
                      setQuantity(Math.max(1, val));
                    }}
                    disabled={product.stock === 0}
                    className="w-full text-center text-[15px] tracking-wider font-medium text-gray-900 focus:outline-none focus:ring-0 bg-transparent disabled:opacity-50 disabled:cursor-not-allowed [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    min="1"
                    aria-label="Adet"
                  />
                </div>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={product.stock === 0}
                  className="px-5 py-3 text-gray-700 hover:bg-gray-50 hover:text-gray-900 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-all duration-200 flex items-center justify-center min-w-[44px]"
                  aria-label="Artır"
                >
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Sepete Ekleme Bildirimi */}
            <div className="flex items-center gap-2 mt-3">
              <Image
                src="/images/icons/basket.svg"
                alt="Sepet"
                width={20}
                height={20}
              />
              <span className="text-[11px] font-medium tracking-widest text-gray-500 uppercase tex0">
                Bu ürünü bugün {randomCount} kişi sepetine ekledi.
              </span>
            </div>

            {/* Sepete Ekle Butonu */}
            <div className="pt-2">
              <button
                disabled={product.stock === 0}
                className={`w-full py-4 px-6 uppercase tracking-widest text-[12px] font-[550] transition-all flex items-center justify-center gap-2 ${
                  product.stock > 0
                    ? "bg-gray-900 text-white hover:bg-gray-800 active:scale-95"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                <Image
                  src="/images/icons/basket.svg"
                  alt="Sepet"
                  width={20}
                  height={20}
                  className={product.stock > 0 ? "invert" : ""}
                />
                {product.stock > 0 ? "Sepete Ekle" : "Stokta Yok"}
              </button>
            </div>

            {/* Kargo ve İade Bilgileri */}
            <div className="flex flex-col gap-0 pt-4">
              {/* Ücretsiz Kargo */}
              <div className="flex items-start gap-3 pb-4">
                <Image
                  src="/images/icons/delivery.svg"
                  alt="Kargo"
                  width={22}
                  height={22}
                />
                <div className="flex flex-col gap-1">
                  <h3 className="text-[11px] font-medium uppercase tracking-widest ">
                    Ücretsiz Kargo
                  </h3>
                  <p className="text-[10px] font-medium tracking-widest uppercase text-gray-500">
                    1500₺ ve üzeri siparişlerde ücretsiz standart kargo
                  </p>
                </div>
              </div>

              {/* Ayırıcı Çizgi */}
              <div className="border-t border-gray-200 mb-4"></div>

              {/* İade Politikası */}
              <div className="flex items-start gap-3">
                <Image
                  src="/images/icons/secure.svg"
                  alt="İade"
                  width={22}
                  height={22}
                />
                <div className="flex flex-col gap-1">
                  <h3 className="text-[11px] font-medium uppercase tracking-widest ">
                    %100 güvenli ödeme
                  </h3>
                  <p className="text-[10px] font-medium tracking-widest uppercase text-gray-500">
                    güvenli alışveriş deneyimi için
                  </p>
                </div>
              </div>
            </div>

            {/* Açıklama */}
            {product.description && (
              <div className="pt-6 border-t border-gray-200">
                <button
                  onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
                  className="w-full flex items-center justify-between bg-gray-100 py-4 hover:bg-gray-200 transition-colors duration-500"
                  aria-expanded={isDescriptionOpen}
                >
                  <h2 className="text-[11px] pl-5 font-[550] uppercase tracking-widest text-gray-900">
                    Ürün Açıklaması
                  </h2>
                  <Image
                    src="/images/icons/arrow-bottom.svg"
                    alt="arrow-down"
                    width={17}
                    height={17}
                    className={`w-4 h-4 mr-5 text-gray-900 transition-transform duration-500 ${
                      isDescriptionOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isDescriptionOpen
                      ? "max-h-[500px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="bg-white px-1 py-4 border-t border-gray-200">
                    <p className="text-[10px] font-medium uppercase  tracking-[0.07em] leading-5 text-gray-500">
                      {product.description}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
