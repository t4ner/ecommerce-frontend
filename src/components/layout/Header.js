"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/cart/useCart";
import { useCartSidebarStore } from "@/stores/cartNotificationStore";
import { useLogout } from "@/hooks/auth/useLogout";
import { useAuthStore } from "@/stores/authStore";
import { useState } from "react";
import { useCategories } from "@/hooks/categories/useCategories";

export default function Header() {
  const { data: cart } = useCart();
  const { openSidebar } = useCartSidebarStore();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const cartItemCount = cart?.itemCount || cart?.cart?.items?.length || 0;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: categories, isLoading: categoriesLoading } = useCategories();

  const handleLogout = () => {
    logout();
  };

  // Tree yapısından sadece ana kategorileri filtrele
  const visibleCategories = categories?.filter(
    (category) => category.parentId === null
  );

  // Hamburger Menu Icon SVG
  const HamburgerIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-white"
    >
      <path
        d="M3 12H21M3 6H21M3 18H21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );

  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden bg-black text-white">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between px-3 py-2">
          {/* Hamburger Menu */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="cursor-pointer"
            aria-label="Menu"
          >
            <HamburgerIcon />
          </button>

          {/* Logo - Center */}
          <div className="flex-1 flex justify-start ml-4">
            <Link href="/" className="block">
              <Image
                src="/images/logo/logo.webp"
                alt="logo"
                width={100}
                height={30}
                loading="eager"
                priority
                style={{ width: "auto", height: "auto", maxHeight: "30px" }}
              />
            </Link>
          </div>

          {/* Action Icons - Right */}
          <div className="flex items-center gap-5">
            {isLoggedIn ? (
              <Link
                href="/profil"
                className="cursor-pointer"
                aria-label="Profil"
              >
                <Image
                  src="/images/icons/profile.svg"
                  alt="profile"
                  width={20}
                  height={20}
                  className="brightness-0 invert"
                />
              </Link>
            ) : (
              <Link
                href="/hesap/giris"
                className="cursor-pointer"
                aria-label="Giriş yap"
              >
                <Image
                  src="/images/icons/profile.svg"
                  alt="login"
                  width={20}
                  height={20}
                  className="brightness-0 invert"
                />
              </Link>
            )}

            {/* Shopping Bag */}
            <button
              onClick={openSidebar}
              className="relative cursor-pointer"
              aria-label="Shopping cart"
            >
              <Image
                src="/images/icons/basket.svg"
                alt="cart"
                width={20}
                height={20}
                className="brightness-0 invert"
              />
              {cartItemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-white text-[#2a2a2a] text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartItemCount > 9 ? "9+" : cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search Bar - Below Navigation */}
        <div className="px-3 pb-2">
          <div className="flex items-center gap-1.5 rounded-lg border-2 border-white px-3 py-1.5 bg-transparent">
            <Image
              src="/images/icons/search.svg"
              alt="search"
              width={18}
              height={18}
              className="brightness-0 invert"
            />
            <input
              type="text"
              placeholder="Ara"
              className="w-full bg-transparent border-none text-white text-xs placeholder:text-white placeholder:font-medium focus:outline-none"
              aria-label="Search"
            />
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <>
        {/* Backdrop */}
        <div
          className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />
        {/* Sidebar Menu - Sağdan Sola */}
        <div
          className={`fixed top-0 right-0 h-full w-full bg-black z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Menu Header */}
            <div className="flex justify-end px-4 py-4 border-b border-white">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white cursor-pointer"
                aria-label="Menüyü kapat"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Menu Content */}
            <div className="flex-1 overflow-y-auto">
              {categoriesLoading ? (
                <div className="px-4 py-4 text-white text-sm text-center">
                  Yükleniyor...
                </div>
              ) : (
                <ul className="flex flex-col">
                  {visibleCategories && visibleCategories.length > 0 ? (
                    visibleCategories.map((category) => (
                      <li
                        key={category._id}
                        className="border-b border-white"
                      >
                        <Link
                          href={`/kategori/${category.slug}`}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block px-4 py-4 text-white text-[11px] uppercase tracking-wide transition-colors hover:bg-gray-700"
                        >
                          {category.name}
                        </Link>
                        {category.children && category.children.length > 0 && (
                          <ul className="bg-gray-800">
                            {category.children.map((child) => (
                              <li key={child._id}>
                                <Link
                                  href={`/kategori/${child.slug}`}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className="block px-8 py-3 text-white text-xs font-medium uppercase tracking-wide transition-colors hover:bg-gray-700"
                                >
                                  {child.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))
                  ) : (
                    <li className="px-4 py-4 text-white text-sm text-center">
                      Kategori bulunamadı
                    </li>
                  )}
                </ul>
              )}
            </div>
          </div>
        </div>
      </>

      {/* Desktop Header */}
      <header className="hidden lg:block container mx-auto">
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
                style={{ width: "auto", height: "auto" }}
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
            {isLoggedIn ? (
              <>
                {/* Profil Linki */}
                <Link
                  href="/profil"
                  className="cursor-pointer hover:opacity-70 transition-opacity"
                  aria-label="Profil"
                >
                  <Image
                    src="/images/icons/profile.svg"
                    alt="profile"
                    width={25}
                    height={25}
                    style={{ width: "auto", height: "auto" }}
                  />
                </Link>

                {/* Logout Butonu */}
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="cursor-pointer hover:opacity-70 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Çıkış yap"
                >
                  <Image
                    src="/images/icons/logout.svg"
                    alt="logout"
                    width={23}
                    height={23}
                  />
                </button>
              </>
            ) : (
              <Link
                href="/hesap/giris"
                className="cursor-pointer hover:opacity-70 transition-opacity"
                aria-label="Giriş yap"
              >
                <Image
                  src="/images/icons/profile.svg"
                  alt="login"
                  width={25}
                  height={25}
                  style={{ width: "auto", height: "auto" }}
                />
              </Link>
            )}

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
    </>
  );
}
