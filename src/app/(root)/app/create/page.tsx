"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { TokenChip } from "@coinbase/onchainkit/token";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { useAccount, useSignMessage } from "wagmi";
import { useAddress } from "@coinbase/onchainkit/identity";

export default function CreateGigForm() {
  const [tags, setTags] = useState<string[]>([]);
  const [config, setConfig] = useState({
    title: "",
    description: "",
    minimumPayment: 0.0,
  });
  const account = useAccount();
  const [loading, setLoading] = useState<boolean>(false);
  // TODO: signMessage integration
  const {
    data: signMessageData,
    error,
    signMessage,
    variables,
  } = useSignMessage();
  const router = useRouter();

  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const token = {
    address: useAddress({ name: "eth" }),
    chainId: 8453,
    decimals: 18,
    image:
      "https://dynamic-assets.coinbase.com/dbb4b4983bde81309ddab83eb598358eb44375b930b94687ebe38bc22e52c3b2125258ffb8477a5ef22e33d6bd72e32a506c391caa13af64c00e46613c3e5806/asset_icons/4113b082d21cc5fab17fc8f2d19fb996165bcce635e6900f7fc2d57c4ef33ae9.png",
    name: "Ethereum",
    symbol: "ETH",
  };

  const createGig = async () => {
    const { title, description, minimumPayment } = config;

    try {
      setLoading(true);

      if (!title || !description || !minimumPayment || tags.length === 0) {
        toast({
          title: "Please fill up all the details",
          variant: "destructive",
        });
      }

      const { data } = await axios.post("/api/gigs", {
        ...config,
        tags,
        owner: account.address,
      });

      if (data.success) {
        toast({ title: "Successfull", description: data?.message });
        router.push("/app");
      }
    } catch (err: any) {
      console.log(err);
      toast({
        title: "Error occurred",
        variant: "destructive",
        description: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex items-center justify-center">
      <Card className="w-full max-w-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="border-b border-gray-200">
          <CardTitle className="text-2xl font-semibold text-blue-500">
            Create a Gig
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="space-y-2">
            <Label
              htmlFor="title"
              className="text-sm font-medium text-gray-700"
            >
              Gig Title
            </Label>
            <Input
              id="title"
              value={config.title}
              placeholder="Enter the title of your gig"
              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
              onChange={(e) => setConfig({ ...config, title: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="description"
              className="text-sm font-medium text-gray-700"
            >
              Description
            </Label>
            <Textarea
              value={config.description}
              onChange={(e) =>
                setConfig({ ...config, description: e.target.value })
              }
              id="description"
              placeholder="Provide a detailed description of your gig (markdown supported)"
              className="min-h-[120px] border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Minimum Payment</p>

            <div className="flex items-center space-x-4">
              <TokenChip token={token} />
              <Input
                id="minPrize"
                type="number"
                value={config.minimumPayment}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    minimumPayment: Number(e.target.value),
                  })
                }
                min="0"
                step="0.01"
                placeholder="0.1"
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags" className="text-sm font-medium text-gray-700">
              Tags
            </Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors duration-200"
                >
                  {tag}
                  <button
                    onClick={() => removeTag(tag)}
                    className="ml-2 text-blue-600 hover:text-blue-800 focus:outline-none"
                    aria-label="Remove tag"
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
            <Input
              id="tags"
              placeholder="Add relevant tags (press Enter to add)"
              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTag((e.target as HTMLInputElement).value);
                  (e.target as HTMLInputElement).value = "";
                }
              }}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-4 bg-gray-50 rounded-b-lg border-t border-gray-200 p-4">
          <Button
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button
            disabled={loading}
            onClick={createGig}
            className="bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200"
          >
            Create Gig
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
