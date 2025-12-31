"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useLogout } from "@/hooks/auth/useLogout";
import { useAuthStore } from "@/stores/authStore";

export default function ProfilePage() {
  const router = useRouter();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();
  const user = useAuthStore((state) => state.user);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  useEffect(() => {
    // Token yoksa login sayfasına yönlendir
    if (!isLoggedIn) {
      router.push("/hesap/giris");
    }
  }, [isLoggedIn, router]);

  const handleLogout = () => {
    logout();
  };

  if (!isLoggedIn || !user) {
    return (
      <div className="py-8 sm:py-10 md:py-12 lg:py-14">
        <div className="px-4 sm:px-6 md:px-8 lg:px-0">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 sm:p-5 md:p-6">
            <p className="text-[12px] sm:text-[13px] text-yellow-800">
              Kullanıcı bilgileri yüklenemedi. Lütfen tekrar giriş yapın.
            </p>
            <Link
              href="/hesap/giris"
              className="mt-4 inline-block px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 bg-black text-white uppercase tracking-widest text-[10px] sm:text-[11px] font-[550] hover:bg-gray-800 transition-colors"
            >
              Giriş Yap
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-10 md:py-12 lg:py-14 min-h-[65vh]">
      <div className="px-4 sm:px-6 md:px-8 lg:px-0">
        {/* Header */}
        <div className="mb-6 sm:mb-8 md:mb-10">
          <h1 className="text-[13px] sm:text-[14px] md:text-[15px] font-medium uppercase tracking-widest text-black">
            Hesabım
          </h1>
        </div>

        {/* Profile Card */}
        <div className="max-w-xl bg-white border border-gray-400 rounded-lg shadow-sm overflow-hidden">
          {/* Profile Header */}
          <div className="px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6">
            <div className="flex items-center gap-4 sm:gap-5 md:gap-6">
              {/* Avatar */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-md bg-gray-200 flex items-center justify-center shrink-0">
                <Image
                  src="/images/icons/profile.svg"
                  alt="profile"
                  width={32}
                  height={32}
                  className="w-8 h-8 sm:w-10 sm:h-10"
                />
              </div>

              {/* User Info */}
              <div className="">
                <h2 className="text-[13px] sm:text-[14px] md:text-[15px] font-medium uppercase tracking-widest text-black mb-2 sm:mb-2.5 md:mb-3">
                  {user.name}
                </h2>
                <p className="text-[13px] sm:text-[14px] md:text-[15px] font-medium uppercase tracking-widest text-gray-500">
                  {user.email}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="py-4 sm:py-5 md:py-6">
          <h2 className="text-[13px] sm:text-[14px] md:text-[15px] font-medium uppercase tracking-widest text-black mt-5 sm:mt-6 md:mt-7">
            Siparişlerim{" "}
          </h2>
        </div>
      </div>
    </div>
  );
}
