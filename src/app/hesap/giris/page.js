"use client";

import { useState } from "react";
import Link from "next/link";
import { useLogin } from "@/hooks/auth/useLogin";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate: login, isPending, error } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(
      { email, password },
      {
        onSuccess: () => {
          // Başarılı giriş - error state'i otomatik temizlenir
        },
        onError: (err) => {
          // Hata durumunda error state'i otomatik set edilir
        },
      }
    );
  };

  const errorMessage =
    error?.response?.data?.message ||
    error?.response?.data?.data?.message ||
    "Hatalı Giriş. Lütfen Tekrar Deneyiniz.";

  return (
    <div className="flex items-center justify-center py-8 md:py-14 min-h-[60vh]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-white border border-gray-400 rounded-lg shadow-sm w-full max-w-2xl mx-auto p-6 md:p-8">
          {/* Tab Buttons */}
          <div className="flex gap-4 mb-6 md:mb-8">
            <button
              type="button"
              className="flex-1 py-3 md:py-4 px-4 uppercase tracking-widest text-[12px] md:text-[14px] lg:text-[15px] font-medium transition-all bg-black text-white"
            >
              Üye Girişi
            </button>
            <Link
              href="/hesap/kayit"
              className="flex-1 py-3 md:py-4 px-4 uppercase tracking-widest text-[12px] md:text-[14px] lg:text-[15px] font-medium transition-all bg-gray-100 text-gray-700 hover:bg-gray-200 text-center"
            >
              Üye Ol
            </Link>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 md:p-4 bg-red-50 border border-red-200 uppercase tracking-widest font-medium rounded-lg">
              <p className="text-red-600 text-[10px] md:text-[11px]">
                {errorMessage}
              </p>
            </div>
          )}

          {/* Login Form */}
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            {/* Email Input */}
            <div>
              <input
                type="email"
                placeholder="E-POSTA"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 font-medium border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-black placeholder-gray-400 placeholder:text-[12px] uppercase tracking-wide text-[16px] md:text-[14px] lg:text-[15px] placeholder:tracking-widest"
                required
                disabled={isPending}
              />
            </div>

            {/* Password Input */}
            <div>
              <input
                type="password"
                placeholder="ŞİFRE"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 font-medium border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-black placeholder-gray-400 placeholder:text-[12px] uppercase tracking-wide text-[16px] md:text-[14px] lg:text-[15px] placeholder:tracking-widest"
                required
                disabled={isPending}
              />
            </div>

            {/* Login Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isPending}
                className="w-full py-3 md:py-4 px-4 md:px-6 uppercase tracking-widest text-[12px] md:text-[14px] lg:text-[15px] font-medium transition-all flex items-center justify-center gap-2 bg-black text-white hover:bg-gray-800 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? "Giriş yapılıyor..." : "Giriş yap"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
