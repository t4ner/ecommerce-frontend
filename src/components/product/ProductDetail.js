"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import { useAddToCart } from "@/hooks/cart/useAddToCart";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

export default function ProductDetail({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const { mutate: addToCart, isPending: isAddingToCart } = useAddToCart();

  // Her resim için zoom durumu
  const [zoomStates, setZoomStates] = useState({});
  const imageRefs = useRef({});

  // Mobil için slider
  const [sliderRef, sliderInstanceRef] = useKeenSlider({
    mode: "free-snap",
    loop: false,
    slides: {
      perView: 1.3,
      spacing: 16,
    },
    breakpoints: {
      "(min-width: 1024px)": {
        disabled: true,
      },
    },
    rubberband: true,
  });

  // Her ürün için 1-15 arasında rastgele sayı
  const randomCount = useMemo(() => {
    return Math.floor(Math.random() * 10) + 1;
  }, [product._id]);

  const handleAddToCart = () => {
    const productId = product._id || product.id;
    if (!productId) return;

    addToCart({
      productData: {
        productId: productId,
        quantity: Number(quantity),
      },
      product: product,
    });
  };

  // Zoom fonksiyonları
  const handleMouseEnter = (index) => {
    setZoomStates((prev) => ({
      ...prev,
      [index]: { ...prev[index], isZoomed: true },
    }));
  };

  const handleMouseLeave = (index) => {
    setZoomStates((prev) => ({
      ...prev,
      [index]: { ...prev[index], isZoomed: false, x: 0, y: 0 },
    }));
  };

  const handleMouseMove = (e, index) => {
    const container = imageRefs.current[index];
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setZoomStates((prev) => ({
      ...prev,
      [index]: { ...prev[index], x, y },
    }));
  };

  // Slider'ı görseller değiştiğinde güncelle
  useEffect(() => {
    if (product.images?.length > 0) {
      sliderInstanceRef.current?.update();
    }
  }, [product.images, sliderInstanceRef]);
  return (
    <div className="py-4 md:py-14 px-4 md:px-0">
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6 md:gap-8 lg:gap-16">
        {/* Sol Taraf - Görseller */}
        <div className="lg:col-span-4">
          {/* Mobil: Slider, Desktop: Normal scroll */}
          <div className="lg:hidden relative">
            {product.images?.length > 0 ? (
              <>
                <div ref={sliderRef} className="keen-slider">
                  {product.images.map((image, index) => (
                    <div key={index} className="keen-slider__slide">
                      <div className="relative border border-gray-100 shadow-md w-full aspect-square overflow-hidden rounded-lg bg-white">
                        <div className="absolute inset-0 p-4">
                          <Image
                            src={image}
                            alt={`${product.name} - Görsel ${index + 1}`}
                            fill
                            className="object-contain"
                            priority={index === 0}
                            sizes="100vw"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="relative border border-gray-100 shadow-md w-full aspect-square overflow-hidden rounded-lg">
                <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-400">
                  Görsel Yok
                </div>
              </div>
            )}
          </div>

          {/* Desktop: Normal scroll with zoom */}
          <div className="hidden lg:block space-y-20">
            {product.images?.length > 0 ? (
              product.images.map((image, index) => {
                const zoomState = zoomStates[index] || {
                  isZoomed: false,
                  x: 50,
                  y: 50,
                };
                const scale = zoomState.isZoomed ? 1.6 : 1;
                const transformOrigin = `${zoomState.x}% ${zoomState.y}%`;

                return (
                  <div
                    key={index}
                    ref={(el) => (imageRefs.current[index] = el)}
                    className="relative border border-gray-100 shadow-md w-full aspect-square overflow-hidden rounded-lg cursor-zoom-in bg-white"
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={() => handleMouseLeave(index)}
                    onMouseMove={(e) => handleMouseMove(e, index)}
                  >
                    <div
                      className="absolute inset-0 p-8"
                      style={{
                        transform: `scale(${scale})`,
                        transformOrigin: transformOrigin,
                        transition: zoomState.isZoomed
                          ? "none"
                          : "transform 0.3s ease-out",
                      }}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} - Görsel ${index + 1}`}
                        fill
                        className="object-contain"
                        priority={index === 0}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="relative border border-gray-100 shadow-md w-full aspect-square overflow-hidden rounded-lg">
                <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-400">
                  Görsel Yok
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sağ Taraf - Ürün Bilgileri (Sticky - Sabit kalır) */}
        <div className="lg:sticky lg:top-24 lg:self-start lg:col-span-3 mt-6 lg:mt-0">
          <div className="flex flex-col space-y-4 md:space-y-6">
            {/* Kategori */}
            <div className="flex items-center gap-2">
              {product.category && (
                <div className="text-[14px] lg:text-[16px] font-medium uppercase tracking-widest text-gray-500">
                  {product.category.name}
                </div>
              )}
              {product.subCategory && (
                <>
                  <span className="text-[10px] md:text-[12px] font-[550] text-gray-400">
                    /
                  </span>
                  <div className="text-[14px] lg:text-[16px] font-medium uppercase tracking-widest text-gray-500">
                    {product.subCategory.name}
                  </div>
                </>
              )}
            </div>

            {/* Ürün Adı */}
            <h1 className="text-[14px] md:text-[22px] font-medium text-black uppercase leading-tight md:leading-10 tracking-widest">
              {product.name}
            </h1>

            {/* Fiyat */}
            <div className="flex items-end gap-x-5">
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg md:text-2xl font-medium tracking-wider">
                  ₺
                </span>
                <span className="text-2xl md:text-4xl font-medium tracking-wide text-black">
                  {product.price}
                </span>
                <span className="text-base md:text-xl font-[Merriweather] font-medium text-gray-600">
                  . 00
                </span>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] md:text-[11px] font-medium uppercase tracking-widest text-gray-500">
                Adet
              </label>
              <div className="flex items-center gap-2 bg-gray-100 rounded-2xl p-1.5 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1),inset_-2px_-2px_4px_rgba(255,255,255,0.8)] w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1 || product.stock === 0}
                  className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-white border border-gray-200/50 flex items-center justify-center text-gray-700 hover:bg-gray-50 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white transition-all duration-200 shadow-[2px_2px_4px_rgba(0,0,0,0.1),-2px_-2px_4px_rgba(255,255,255,0.8)] active:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1),inset_-2px_-2px_4px_rgba(255,255,255,0.8)]"
                  aria-label="Azalt"
                >
                  <svg
                    className="w-3 h-3 md:w-3.5 md:h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M20 12H4"
                    />
                  </svg>
                </button>
                <div className="max-w-[60px] md:max-w-[70px] font-[Rubik] px-3 md:px-4 py-1.5 md:py-2 bg-white rounded-xl text-center shadow-[inset_1px_1px_2px_rgba(0,0,0,0.05)]">
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 1;
                      setQuantity(Math.max(1, val));
                    }}
                    disabled={product.stock === 0}
                    className="w-full text-center text-sm md:text-base font-medium text-black focus:outline-none focus:ring-0 bg-transparent disabled:opacity-50 disabled:cursor-not-allowed [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    min="1"
                    aria-label="Adet"
                  />
                </div>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={product.stock === 0}
                  className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-white border border-gray-200/50 flex items-center justify-center text-gray-700 hover:bg-gray-50 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white transition-all duration-200 shadow-[2px_2px_4px_rgba(0,0,0,0.1),-2px_-2px_4px_rgba(255,255,255,0.8)] active:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1),inset_-2px_-2px_4px_rgba(255,255,255,0.8)]"
                  aria-label="Artır"
                >
                  <svg
                    className="w-3 h-3 md:w-3.5 md:h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Sepete Ekleme Bildirimi */}
            <div className="flex items-center gap-2 mt-2 md:mt-3">
              <Image
                src="/images/icons/basket.svg"
                alt="Sepet"
                width={16}
                height={16}
                className="md:w-5 md:h-5"
              />
              <span className="text-[9px] md:text-[14px] font-medium tracking-widest text-gray-500 uppercase">
                Bu ürünü bugün {randomCount} kişi sepetine ekledi.
              </span>
            </div>

            {/* Sepete Ekle Butonu */}
            <div className="pt-2">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0 || isAddingToCart}
                className={`w-full py-3 md:py-4 px-4 md:px-6 uppercase tracking-widest text-[10px] md:text-[14px] font-medium transition-all flex items-center justify-center gap-2 ${
                  product.stock > 0 && !isAddingToCart
                    ? "bg-black text-white hover:bg-gray-800 active:scale-95"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                <Image
                  src="/images/icons/basket.svg"
                  alt="Sepet"
                  width={16}
                  height={16}
                  className={`md:w-5 md:h-5 ${
                    product.stock > 0 && !isAddingToCart ? "invert" : ""
                  }`}
                />
                {isAddingToCart
                  ? "Ekleniyor..."
                  : product.stock > 0
                  ? "Sepete Ekle"
                  : "Stokta Yok"}
              </button>
            </div>

            {/* Kargo ve İade Bilgileri */}
            <div className="flex flex-col gap-0 pt-3 md:pt-4">
              {/* Ücretsiz Kargo */}
              <div className="flex items-start gap-2 md:gap-3 pb-3 md:pb-4">
                <Image
                  src="/images/icons/delivery.svg"
                  alt="Kargo"
                  width={18}
                  height={18}
                  className="md:w-[22px] md:h-[22px]"
                />
                <div className="flex flex-col gap-0.5 md:gap-1">
                  <h3 className="text-[14px] lg:text-[14px] font-medium uppercase tracking-widest">
                    Ücretsiz Kargo
                  </h3>
                  <p className="text-[14px] lg:text-[14px] font-medium tracking-widest uppercase text-gray-500">
                    1500₺ ve üzeri siparişlerde ücretsiz standart kargo
                  </p>
                </div>
              </div>

              {/* Ayırıcı Çizgi */}
              <div className="border-t border-gray-200 mb-3 md:mb-4"></div>

              {/* İade Politikası */}
              <div className="flex items-start gap-2 md:gap-3">
                <Image
                  src="/images/icons/secure.svg"
                  alt="İade"
                  width={18}
                  height={18}
                  className="md:w-[22px] md:h-[22px]"
                />
                <div className="flex flex-col gap-0.5 md:gap-1">
                  <h3 className="text-[14px] lg:text-[14px] font-medium uppercase tracking-widest">
                    %100 güvenli ödeme
                  </h3>
                  <p className="text-[14px] lg:text-[14px] font-medium tracking-widest uppercase text-gray-500">
                    güvenli alışveriş deneyimi için
                  </p>
                </div>
              </div>
            </div>

            {/* Açıklama */}
            {product.description && (
              <div className="pt-4 md:pt-6 border-t border-gray-200">
                <button
                  onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
                  className="w-full flex items-center justify-between bg-gray-100 py-3 md:py-4 hover:bg-gray-200 transition-colors duration-500"
                  aria-expanded={isDescriptionOpen}
                >
                  <h2 className="text-[10px] md:text-[14px] pl-3 md:pl-5 font-medium uppercase tracking-widest text-black">
                    Ürün Açıklaması
                  </h2>
                  <Image
                    src="/images/icons/arrow-bottom.svg"
                    alt="arrow-down"
                    width={14}
                    height={14}
                    className={`w-3.5 h-3.5 md:w-4 md:h-4 mr-3 md:mr-5 text-black transition-transform duration-500 ${
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
                  <div className="bg-white px-1 py-3 md:py-4 border-t border-gray-200">
                    <p className="text-[9px] md:text-[14px] font-medium uppercase tracking-[0.07em] leading-4 md:leading-5 text-gray-500">
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
