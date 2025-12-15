"use client";

import { useCampaigns } from "@/hooks/campaigns/useCampaigns";
import Image from "next/image";
import Link from "next/link";

export default function Campaigns() {
  const { data: campaigns, isLoading } = useCampaigns();

  if (isLoading) {
    return (
      <section>
        <div className="flex gap-6 h-[500px]">
          <div className="flex-2 bg-gray-200 animate-pulse rounded-lg" />
          <div className="flex-1 bg-gray-200 animate-pulse rounded-lg" />
        </div>
      </section>
    );
  }

  if (!campaigns?.length) return null;

  const [leftCampaign, rightCampaign] = campaigns.slice(0, 2);

  const CampaignItem = ({ campaign, flexClass, sizes }) => {
    if (!campaign) return null;

    const content = (
      <Image
        src={campaign.imageUrl}
        alt={campaign.name}
        fill
        className="object-cover"
        sizes={sizes}
      />
    );

    return (
      <div className={`${flexClass} relative rounded-lg overflow-hidden`}>
        {campaign.slug ? (
          <Link
            href={`/${campaign.slug}`}
            className="block w-full h-full relative"
          >
            {content}
          </Link>
        ) : (
          <div className="relative w-full h-full">{content}</div>
        )}
      </div>
    );
  };

  return (
    <section>
      <div className="flex gap-6 h-[500px] md:h-[400px]">
        <CampaignItem
          campaign={leftCampaign}
          flexClass="flex-2"
          sizes="(max-width: 768px) 100vw, 55vw"
        />
        <CampaignItem
          campaign={rightCampaign}
          flexClass="flex-1"
          sizes="(max-width: 768px) 100vw, 45vw"
        />
      </div>
    </section>
  );
}
