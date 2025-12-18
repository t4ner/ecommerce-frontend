"use client";

import { useCart } from "@/hooks/cart/useCart";
import { useUpdateCartItem } from "@/hooks/cart/useUpdateCartItem";
import { useRemoveFromCart } from "@/hooks/cart/useRemoveFromCart";
import { useClearCart } from "@/hooks/cart/useClearCart";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { data: cart, isLoading, isError } = useCart();
  const { mutate: updateCartItem, isPending: isUpdating } = useUpdateCartItem();
  const { mutate: removeFromCart, isPending: isRemoving } = useRemoveFromCart();
  const { mutate: clearCart, isPending: isClearing } = useClearCart();

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    updateCartItem({ productId, updateData: { quantity: newQuantity } });
  };

  const handleRemove = (productId) => {
    if (confirm("Bu ürünü sepetten çıkarmak istediğinize emin misiniz?")) {
      removeFromCart(productId);
    }
  };

  const handleClearCart = () => {
    if (confirm("Sepeti tamamen temizlemek istediğinize emin misiniz?")) {
      clearCart();
    }
  };

  if (isLoading) {
    return (
      <div className="py-24 flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border border-gray-400 border-t-gray-900 rounded-full animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-24 text-center min-h-[60vh]">
        <h3 className="text-[14px] font-[550] uppercase tracking-widest text-black mb-4">
          Sepet Yüklenirken Hata Oluştu
        </h3>
      </div>
    );
  }

  const cartItems = cart?.cart?.items || [];
  const totalPrice = parseFloat(cart?.total || 0);
  const itemCount = cart?.itemCount || 0;

  return (
    <div className="py-14 min-h-[60vh]">
      <div className="container mx-auto">
        {/* Başlık ve Ürün Sayısı */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-[14px] font-[550] uppercase tracking-widest text-black">
            SEPETİM
          </h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <div className="mb-6">
              <svg
                className="w-16 h-16 mx-auto text-gray-300"
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
            <p className="text-[13px] font-[550] uppercase tracking-widest text-black mb-4">
              Sepetiniz boş
            </p>
            <Link
              href="/"
              className="inline-block px-8 py-3 bg-black text-white uppercase tracking-widest text-[12px] font-[550] hover:bg-gray-800 transition-all"
            >
              Alışverişe Devam Et
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Sepet Ürünleri - Kart Tasarımı */}
            <div className="lg:col-span-2 space-y-10">
              {cartItems.map((item) => {
                const itemTotal = item.product.price * item.quantity;
                return (
                  <div
                    key={item.product._id}
                    className="bg-white border-b border-gray-400 p-5 hover:shadow-md transition-shadow"
                  >
                    <div className="flex gap-5">
                      {/* Ürün Görseli */}
                      <Link
                        href={`/urun/${item.product.slug}`}
                        className="relative w-28 h-28 shrink-0 bg-gray-50 rounded-md overflow-hidden group"
                      >
                        <Image
                          src={
                            item.product.images?.[0] ||
                            "/images/placeholder-product.png"
                          }
                          alt={item.product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </Link>

                      {/* Ürün Bilgileri */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          {/* Ürün Adı ve Sil Butonu */}
                          <div className="flex items-start justify-between mb-2">
                            <Link
                              href={`/urun/${item.product.slug}`}
                              className="text-[13px] font-[550] uppercase tracking-widest  hover:text-gray-600 flex-1 pr-4"
                            >
                              {item.product.name}
                            </Link>
                            <button
                              onClick={() => handleRemove(item.product._id)}
                              disabled={isRemoving}
                              className="text-gray-400 hover:text-red-500 disabled:opacity-50 transition-colors shrink-0"
                              aria-label="Ürünü sil"
                            >
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
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>

                          {/* Birim Fiyat */}
                          <div className="text-[15px] font-medium uppercase tracking-widest font-[Rubik]  mb-4">
                            ₺ {item.product.price.toFixed(2).replace(".", ",")}
                          </div>

                          {/* Adet ve Toplam Fiyat */}
                          <div className="flex items-center justify-between">
                            {/* Adet Seçici - Yeni Tasarım */}
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() =>
                                    handleQuantityChange(
                                      item.product._id,
                                      item.quantity - 1
                                    )
                                  }
                                  disabled={isUpdating || item.quantity <= 1}
                                  className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-gray-400 hover:bg-gray-50 hover:text-black disabled:opacity-25 disabled:cursor-not-allowed disabled:hover:border-gray-300 disabled:hover:bg-transparent transition-all duration-200"
                                  aria-label="Azalt"
                                >
                                  <svg
                                    className="w-2 h-2"
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
                                <div className="min-w-[30px] text-center">
                                  <span className="text-[14px] font-medium font-[Rubik] text-black">
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
                                  className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-gray-400 hover:bg-gray-50 hover:text-black disabled:opacity-25 disabled:cursor-not-allowed disabled:hover:border-gray-300 disabled:hover:bg-transparent transition-all duration-200"
                                  aria-label="Artı"
                                >
                                  <svg
                                    className="w-2 h-2"
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
                            <div className="text-right">
                              <div className="text-[16px] font-medium tracking-wider font-[Rubik] text-black">
                                ₺ {itemTotal.toFixed(2).replace(".", ",")}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              {cartItems.length > 0 && (
                <button
                  onClick={handleClearCart}
                  disabled={isClearing}
                  className="text-[13px] text-red-600 hover:text-red-700 disabled:opacity-50 uppercase tracking-widest font-[550] transition-all"
                >
                  {isClearing ? "Temizleniyor..." : "Sepeti Temizle"}
                </button>
              )}
            </div>

            {/* Sipariş Özeti - Modern Kart */}
            <div className="lg:col-span-1">
              <div className=" border border-gray-400 rounded-lg p-6 sticky top-24">
                <h2 className="text-[13px] font-[550] uppercase tracking-widest mb-6 pb-4 border-b border-gray-400">
                  Sipariş Özeti
                </h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-[13px] text-gray-400">
                    <span className=" font-[550] uppercase tracking-widest">
                      Ara Toplam
                    </span>
                    <span className="text-[16px] font-medium tracking-wider font-[Rubik] text-black">
                      ₺{totalPrice.toFixed(2).replace(".", ",")}
                    </span>
                  </div>
                  <div className="flex justify-between text-[13px] font-[550] uppercase tracking-widest text-gray-400 mb-6  ">
                    <span>Kargo</span>
                    <span className="text-[13px] font-medium tracking-widest text-black">
                      {totalPrice >= 1500 ? "Ücretsiz" : "₺50,00"}
                    </span>
                  </div>
                  <div className="pt-3 mt-3 border-t border-gray-400">
                    <div className="flex justify-between text-[16px] font-medium tracking-wider uppercase  mb-6 pb-4  mt-5 border-b border-gray-400">
                      <span className=" text-gray-400 text-[13px] font-[550] tracking-widest">
                        Toplam
                      </span>
                      <span className="font-[Rubik]">
                        <span className="font-[Rubik]">
                          ₺
                          {(totalPrice >= 1500 ? totalPrice : totalPrice + 50)
                            .toFixed(2)
                            .replace(".", ",")}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>

                <button className="w-full py-4 px-6 uppercase tracking-widest text-[12px] font-[550] transition-all flex items-center justify-center gap-2 bg-black text-white hover:bg-gray-800 active:scale-[0.98] ">
                  Ödeme Yap
                </button>

                <div className="mt-4 text-center">
                  <Link
                    href="/"
                    className="text-[10px] font-medium text-gray-500 hover:text-gray-700 uppercase tracking-widest transition-colors"
                  >
                    Alışverişe Devam Et
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
