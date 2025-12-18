"use client";

import { useCampaigns } from "@/hooks/campaigns/useCampaigns";
import Image from "next/image";
import Link from "next/link";

export default function Campaigns() {
  const { data: campaigns, isLoading } = useCampaigns();

  if (isLoading) {
    return (
      <section>
        <div className="flex flex-col gap-6">
          <div className="w-full h-[500px] bg-gray-200 animate-pulse rounded-lg" />
          <div className="w-full h-[500px] bg-gray-200 animate-pulse rounded-lg" />
        </div>
      </section>
    );
  }

  if (!campaigns?.length) return null;

  return (
    <section>
      <div className="flex flex-col gap-6">
        {campaigns.slice(0, 2).map((campaign, index) => (
          <div
            key={campaign._id || campaign.id || `campaign-${index}`}
            className="w-full relative rounded-lg overflow-hidden h-[500px] md:h-[650px]"
          >
            {campaign.slug ? (
              <Link
                href={`/${campaign.slug}`}
                className="block w-full h-full relative"
              >
                <Image
                  src={campaign.imageUrl}
                  alt={campaign.name}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </Link>
            ) : (
              <Image
                src={campaign.imageUrl}
                alt={campaign.name}
                fill
                className="object-cover"
                sizes="100vw"
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
