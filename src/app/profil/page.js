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
      <div className="py-14">
        <div className="">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <p className="text-[13px] text-yellow-800">
              Kullanıcı bilgileri yüklenemedi. Lütfen tekrar giriş yapın.
            </p>
            <Link
              href="/hesap/giris"
              className="mt-4 inline-block px-6 py-3 bg-black text-white uppercase tracking-widest text-[11px] font-[550] hover:bg-gray-800 transition-colors"
            >
              Giriş Yap
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-14">
      <div className="">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-[14px] font-[550] uppercase tracking-widest text-black">
            Hesabım
          </h1>
        </div>

        {/* Profile Card */}
        <div className="max-w-xl bg-white border border-gray-400 rounded-lg shadow-sm overflow-hidden">
          {/* Profile Header */}
          <div className=" px-8 py-6">
            <div className="flex items-center gap-6 ">
              {/* Avatar */}
              <div className="w-20 h-20 rounded-md bg-gray-200 flex items-center justify-center shrink-0">
                <Image
                  src="/images/icons/profile.svg"
                  alt="profile"
                  width={40}
                  height={40}
                />
              </div>

              {/* User Info */}
              <div className="">
                <h2 className="text-[14px] font-[550] uppercase tracking-widest text-black mb-3">
                  {user.name}
                </h2>
                <p className="text-[10px] font-medium uppercase tracking-widest text-gray-500">
                  {user.email}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="py-6">
          <h2 className="text-[14px] font-[550] uppercase tracking-widest text-black mt-7">
            Siparişlerim{" "}
          </h2>
        </div>
      </div>
    </div>
  );
}
