"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

export default function ReactQueryProvider({ children }) {
  // QueryClient'i component içinde oluştur (her render'da yeni instance oluşmasın)
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Varsayılan query ayarları
            retry: 1, // Hata durumunda 1 kez tekrar dene
            refetchOnWindowFocus: false, // Pencere focus olduğunda otomatik yenileme
            refetchOnMount: true, // Component mount olduğunda yenile
            refetchOnReconnect: true, // İnternet bağlantısı geldiğinde yenile
            staleTime: 1000 * 60 * 5, // 5 dakika - veri fresh kalır
            gcTime: 1000 * 60 * 10, // 10 dakika - cache'de kalır (eski cacheTime)
          },
          mutations: {
            // Varsayılan mutation ayarları
            retry: 1,
            // Global error handling için onError eklenebilir
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* React Query DevTools - sadece development'ta görünür */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
