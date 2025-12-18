"use client";

import Link from "next/link";

export default function LoginPage() {
  return (
    <div className=" flex items-center justify-center py-20">
      <div className="bg-white border border-gray-400 rounded-lg shadow-sm w-full max-w-2xl p-8">
        {/* Brand Name */}
        <div className="text-center mb-8">
          <h1 className="uppercase tracking-widest text-[20px] font-[550] text-black">
            TESOLA CONCEPT
          </h1>
        </div>

        {/* Tab Buttons */}
        <div className="flex gap-4 mb-8">
          <button
            type="button"
            className="flex-1 py-4 px-4 uppercase tracking-widest text-[12px] font-[550] transition-all bg-black text-white"
          >
            Üye Girişi
          </button>
          <Link
            href="/hesap/kayit"
            className="flex-1 py-4 px-4 uppercase tracking-widest text-[12px] font-[550] transition-all bg-gray-100 text-gray-700 hover:bg-gray-200 text-center"
          >
            Üye Ol
          </Link>
        </div>

        {/* Login Form */}
        <form className="space-y-6">
          {/* Email Input */}
          <div>
            <input
              type="email"
              placeholder="E-POSTA"
              className="w-full px-4 py-3 font-[450] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-black placeholder-gray-400 placeholder:text-[11px]  placeholder:tracking-widest"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <input
              type="password"
              placeholder="ŞİFRE"
              className="w-full px-4 py-3 font-[450] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-black placeholder-gray-400 placeholder:text-[11px]  placeholder:tracking-widest"
              required
            />
          </div>

          {/* Login Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-4 px-6 uppercase tracking-widest text-[12px] font-[550] transition-all flex items-center justify-center gap-2 bg-black text-white hover:bg-gray-800 active:scale-95"
            >
              Giriş yap
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
