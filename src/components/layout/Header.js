"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/cart/useCart";
import { useCartSidebarStore } from "@/stores/cartNotificationStore";

export default function Header() {
  const { data: cart } = useCart();
  const { openSidebar } = useCartSidebarStore();
  const cartItemCount = cart?.itemCount || cart?.cart?.items?.length || 0;

  return (
    <header className="container mx-auto">
      <div className="flex items-center justify-between py-3">
        {/* Logo */}
        <div>
          <Link href="/">
            <Image
              src="/images/logo/logo.webp"
              alt="logo"
              width={100}
              height={100}
              loading="eager"
              priority
            />
          </Link>
        </div>

        {/* Search Bar */}
        <div className="w-[35%]">
          <div className="flex items-center gap-2 rounded-md border border-gray-400 px-4 py-2">
            <Image
              src="/images/icons/search.svg"
              alt="search"
              width={20}
              height={20}
            />
            <input
              type="text"
              placeholder="?"
              className="w-full border-none text-sm font- tracking-wide placeholder:text-sm placeholder:font-medium placeholder:text-gray-800 focus:outline-none"
              aria-label="Search"
            />
          </div>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-10">
          <Link href="/hesap/giris">
            {" "}
            <Image
              src="/images/icons/profile.svg"
              alt="profile"
              width={25}
              height={25}
            />
          </Link>

          <button
            onClick={openSidebar}
            className="relative cursor-pointer"
            aria-label="Shopping cart"
          >
            <Image
              src="/images/icons/basket.svg"
              alt="cart"
              width={25}
              height={25}
            />
            {cartItemCount > 0 && (
              <span className="absolute font-[Rubik] -top-2 -right-2 bg-black text-white text-[10px] font-medium rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemCount > 9 ? "9+" : cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
