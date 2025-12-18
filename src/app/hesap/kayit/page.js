"use client";

import { useState } from "react";
import Link from "next/link";
import { useRegister } from "@/hooks/auth/useRegister";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { mutate: register, isPending, error } = useRegister();

  const handleSubmit = (e) => {
    e.preventDefault();

    register(
      { name, email, password },
      {
        onError: (err) => {
          // Hata zaten mutation içinde handle ediliyor, burada ek işlem yapılabilir
        },
      }
    );
  };

  const errorMessage =
    error?.response?.data?.message ||
    "Kayıt işlemi sırasında bir hata oluştu. Lütfen tekrar deneyiniz.";

  const passwordMismatch =
    password && confirmPassword && password !== confirmPassword;

  return (
    <div className=" flex items-center justify-center py-20">
      <div className="bg-white border border-gray-400 rounded-lg shadow-sm w-full max-w-2xl p-8">
        {/* Brand Name */}
        <div className="text-center mb-8">
          <h1 className="text-2xl  uppercase tracking-widest text-[20px] font-[550] text-black">
            TESOLA CONCEPT
          </h1>
        </div>

        {/* Tab Buttons */}
        <div className="flex gap-4 mb-8">
          <Link
            href="/hesap/giris"
            className="flex-1 py-4 px-4 uppercase tracking-widest text-[12px] font-[550] transition-all bg-gray-100 text-gray-700 hover:bg-gray-200 text-center"
          >
            Üye Girişi
          </Link>
          <button
            type="button"
            className="flex-1 py-4 px-4 uppercase tracking-widest text-[12px] font-[550] transition-all bg-black text-white"
          >
            Üye Ol
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 uppercase tracking-widest font-medium rounded-lg">
            <p className="text-red-600 text-[11px]">{errorMessage}</p>
          </div>
        )}

        {/* Register Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Name Input */}
          <div>
            <input
              type="text"
              placeholder="AD SOYAD"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 font-[450] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-black placeholder-gray-400 placeholder:text-[11px]  placeholder:tracking-widest"
              required
              disabled={isPending}
            />
          </div>

          {/* Email Input */}
          <div>
            <input
              type="email"
              placeholder="E-POSTA"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 font-[450] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-black placeholder-gray-400 placeholder:text-[11px]  placeholder:tracking-widest"
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
              className="w-full px-4 py-3 font-[450] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-black placeholder-gray-400 placeholder:text-[11px]  placeholder:tracking-widest"
              required
              disabled={isPending}
            />
          </div>

          {/* Confirm Password Input */}
          <div>
            <input
              type="password"
              placeholder="ŞİFRE TEKRAR"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 font-[450] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-black placeholder-gray-400 placeholder:text-[11px]  placeholder:tracking-widest"
              required
              disabled={isPending}
            />
          </div>

          {/* Register Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isPending || passwordMismatch}
              className="w-full py-4 px-6 uppercase tracking-widest text-[12px] font-[550] transition-all flex items-center justify-center gap-2 bg-black text-white hover:bg-gray-800 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "Kayıt yapılıyor..." : "Üye Ol"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
