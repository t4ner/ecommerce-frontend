import Image from "next/image";

export default function InfoBar() {
  const features = [
    {
      icon: "/images/icons/delivery.svg",
      title: "Ücretsiz kargo",
      description: "Tüm ürünlerde",
    },
    {
      icon: "/images/icons/return.svg",
      title: "Kolay iade",
      description: "Kullanılmamış ürünlerde",
    },
    {
      icon: "/images/icons/secure.svg",
      title: "Güvenli ödeme",
      description: "%100 güvenli ödeme",
    },
  ];

  return (
    <section className="mb-8 md:mb-14 px-1 md:px-0">
      <div className="grid grid-cols-2 sm:flex sm:flex-row items-center justify-center sm:justify-around gap-3 sm:gap-4 md:gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`flex items-center justify-center gap-x-1.5 sm:gap-x-3 md:gap-x-4 ${
              index === 2 ? "col-span-2 sm:col-span-1 mt-4 sm:mt-0" : ""
            }`}
          >
            {/* Icon with scalloped border */}
            <div className="relative shrink-0">
              <div className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg bg-[#F4F4F4] flex items-center justify-center relative">
                {/* Scalloped edge decorative border */}

                <div className="relative z-10 w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8">
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    width={32}
                    height={32}
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>

            {/* Text content */}
            <div className="flex flex-col">
              <h3 className="font-medium text-[11px] md:text-[14px] uppercase tracking-widest">
                {feature.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
