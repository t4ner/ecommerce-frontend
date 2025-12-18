"use client";

import { useState, useEffect } from "react";
import { useCartSidebarStore } from "@/stores/cartNotificationStore";
import { useCart } from "@/hooks/cart/useCart";
import { useUpdateCartItem } from "@/hooks/cart/useUpdateCartItem";
import { useRemoveFromCart } from "@/hooks/cart/useRemoveFromCart";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartSidebar() {
  const [isMounted, setIsMounted] = useState(false);
  const { isOpen, closeSidebar } = useCartSidebarStore();
  const { data: cart, isLoading } = useCart();
  const { mutate: updateCartItem, isPending: isUpdating } = useUpdateCartItem();
  const { mutate: removeFromCart, isPending: isRemoving } = useRemoveFromCart();
  const router = useRouter();

  // Hydration mismatch'i önlemek için client-side mount kontrolü
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Server-side render sırasında hiçbir şey render etme
  if (!isMounted) {
    return null;
  }

  const cartItems = cart?.cart?.items || [];
  const totalPrice = parseFloat(cart?.total || 0);
  const itemCount = cart?.itemCount || 0;

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    updateCartItem({ productId, updateData: { quantity: newQuantity } });
  };

  const handleRemove = (productId) => {
    removeFromCart(productId);
  };

  const handleGoToCart = () => {
    closeSidebar();
    router.push("/sepet");
  };

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        isOpen
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      }`}
    >
      {/* Overlay with backdrop blur */}
      <div
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closeSidebar}
      />

      {/* Sidebar - Sağdan açılan */}
      <div
        className={`absolute right-0 top-0 h-full w-full max-w-xl  bg-gray-50 shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
          isOpen
            ? "translate-x-0 pointer-events-auto"
            : "translate-x-full pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200/60 bg-white/80 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-black rounded-md" />
            <h2 className="text-[12px] font-[550] uppercase tracking-widest text-black">
              Sepetim
            </h2>
          </div>
          <button
            onClick={closeSidebar}
            className="w-8 h-8 rounded-sm bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-black transition-all duration-200 flex items-center justify-center group"
            aria-label="Kapat"
          >
            <svg
              className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto px-3 py-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-24">
              <div className="w-10 h-10 border-3 border-gray-200 border-t-gray-900 rounded-full animate-spin mb-4" />
              <p className="text-sm text-gray-500 font-medium">Yükleniyor...</p>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="text-center py-24">
              <div className="mb-8 flex justify-center">
                <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-[13px] font-[550] uppercase tracking-widest text-black mb-7">
                Sepetiniz boş
              </p>

              <button
                onClick={closeSidebar}
                className="inline-flex items-center gap-2 px-8 py-3.5  bg-black text-white uppercase tracking-widest text-[11px] font-[550] hover:from-gray-800 hover:to-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Alışverişe Devam Et
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {cartItems.map((item) => {
                const itemTotal = item.product.price * item.quantity;
                return (
                  <div
                    key={item.product._id}
                    className="group bg-white rounded-xl border border-gray-200/80 p-5 hover:shadow-sm hover:border-gray-300 transition-all duration-300"
                  >
                    <div className="flex gap-4">
                      {/* Ürün Görseli */}
                      <Link
                        href={`/urun/${item.product.slug}`}
                        onClick={closeSidebar}
                        className="relative w-20 h-20 shrink-0 bg-gray-100 rounded-lg overflow-hidden group-hover:shadow-md transition-all duration-300"
                      >
                        <Image
                          src={
                            item.product.images?.[0] ||
                            "/images/placeholder-product.png"
                          }
                          alt={item.product.name}
                          fill
                          sizes="80px"
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </Link>

                      {/* Ürün Bilgileri */}
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          {/* Ürün Adı ve Sil Butonu */}
                          <div className="flex items-start justify-between mb-2 gap-2">
                            <Link
                              href={`/urun/${item.product.slug}`}
                              onClick={closeSidebar}
                              className="text-[12px] font-[550] uppercase tracking-widest hover:text-gray-600 flex-1 pr-2 line-clamp-2 transition-colors"
                            >
                              {item.product.name}
                            </Link>
                            <button
                              onClick={() => handleRemove(item.product._id)}
                              disabled={isRemoving}
                              className="w-8 h-8 rounded-sm bg-red-50 text-red-500 disabled:opacity-50 transition-all duration-200 flex items-center justify-center shrink-0 group/remove"
                              aria-label="Ürünü sil"
                            >
                              <svg
                                className="w-4 h-4 group-hover/remove:rotate-90 transition-transform duration-200"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2.5}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>

                          {/* Birim Fiyat, Adet ve Toplam Fiyat - Yan Yana */}
                          <div className="flex items-center justify-between mt-6 w-full">
                            {/* Birim Fiyat */}
                            <div className="text-[15px] font-medium tracking-wider text-black font-[Rubik] whitespace-nowrap shrink-0">
                              ₺{" "}
                              {item.product.price.toFixed(2).replace(".", ",")}
                            </div>

                            {/* Adet Seçici - Ortada */}
                            <div className="flex items-center justify-center flex-1 mx-4">
                              <div className="flex items-center gap-3">
                                <button
                                  onClick={() =>
                                    handleQuantityChange(
                                      item.product._id,
                                      item.quantity - 1
                                    )
                                  }
                                  disabled={isUpdating || item.quantity <= 1}
                                  className="w-6 h-6  rounded-full bg-white border border-gray-400 flex items-center justify-center text-gray-600 hover:border-gray-400 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
                                  aria-label="Azalt"
                                >
                                  <svg
                                    className="w-2.5 h-2.5"
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
                                <div className="min-w-[20px] text-center">
                                  <span className="text-[14px] font-[550] tracking-wider font-[Rubik] text-black">
                                    {item.quantity}
                                  </span>
                                </div>
                                <button
                                  onClick={() =>
                                    handleQuantityChange(
                                      item.product._id,
                                      item.quantity + 1
                                    )
                                  }
                                  disabled={isUpdating}
                                  className="w-6 h-6 rounded-full bg-white border border-gray-400 flex items-center justify-center text-gray-600 hover:border-gray-400 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
                                  aria-label="Artır"
                                >
                                  <svg
                                    className="w-2.5 h-2.5"
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

                            {/* Toplam Fiyat */}
                            <div className="text-[15px] font-medium tracking-wide font-[Rubik] text-black whitespace-nowrap shrink-0">
                              ₺ {itemTotal.toFixed(2).replace(".", ",")}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer - Total and Buttons */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-200/60 bg-white/95 backdrop-blur-sm px-6 py-5 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
            {/* Total */}
            <div className="flex items-center justify-between mb-5 pb-4 border-b border-gray-200/60">
              <span className="text-[12px] font-semibold uppercase tracking-widest text-black">
                Toplam
              </span>
              <span className="text-[15px] font-medium tracking-wider font-[Rubik] text-black">
                ₺ {totalPrice.toFixed(2).replace(".", ",")}
              </span>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <Link
                href="/sepet"
                onClick={closeSidebar}
                className="flex-1 py-4 px-5 bg-black text-white uppercase tracking-widest text-xs font-semibold hover:from-gray-800 hover:to-gray-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl group"
              >
                <span>ÖDEME ADIMINA GİT</span>
              </Link>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        /* Custom scrollbar */
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }

        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: rgba(156, 163, 175, 0.5);
          border-radius: 10px;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background-color: rgba(156, 163, 175, 0.7);
        }
      `}</style>
    </div>
  );
}
