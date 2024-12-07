"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAddress } from "@coinbase/onchainkit/identity";
import { TokenChip } from "@coinbase/onchainkit/token";
import Link from "next/link";

function JobCard({
  item,
}: {
  item: {
    owner: string;
    title: string;
    tags: string[];
    minimumPayment: number;
    _id: string;
  };
}) {
  const { owner, title, tags, minimumPayment } = item;

  const token = {
    address: useAddress({ name: "eth" }),
    chainId: 8453,
    decimals: 18,
    image:
      "https://dynamic-assets.coinbase.com/dbb4b4983bde81309ddab83eb598358eb44375b930b94687ebe38bc22e52c3b2125258ffb8477a5ef22e33d6bd72e32a506c391caa13af64c00e46613c3e5806/asset_icons/4113b082d21cc5fab17fc8f2d19fb996165bcce635e6900f7fc2d57c4ef33ae9.png",
    name: "Ethereum",
    symbol: minimumPayment.toString(),
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
      <div className="flex flex-col gap-4 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <div className="font-medium text-blue-600">{owner}</div>
              <div className="text-lg font-semibold text-blue-900">{title}</div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <div
              key={tag}
              className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 shadow-sm"
            >
              {tag}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between text-sm text-blue-700">
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <TokenChip token={token} />
            </div>
          </div>
        </div>
        <Button
          asChild
          className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 shadow-md hover:shadow-lg"
        >
          <Link href={`/app/gig/${item?._id.toString()}`}>See More</Link>
        </Button>
      </div>
    </Card>
  );
}

export default JobCard;
