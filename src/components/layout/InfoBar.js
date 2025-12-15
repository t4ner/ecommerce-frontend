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
    <section>
      <div className="flex items-center justify-around">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center justify-center gap-x-4">
            {/* Icon with scalloped border */}
            <div className="relative shrink-0">
              <div className="w-16 h-16 rounded-lg bg-[#F4F4F4] flex items-center justify-center relative">
                {/* Scalloped edge decorative border */}

                <div className="relative z-10">
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    width={32}
                    height={32}
                  />
                </div>
              </div>
            </div>

            {/* Text content */}
            <div className="flex flex-col">
              <h3 className="font-[550] text-[12px] uppercase tracking-widest">
                {feature.title}
              </h3>
        
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
