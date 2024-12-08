import { getSingleGig } from "@/lib/db-function";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { EthChip } from "@/components/core/app/eth-chip";
import ContactFreelancerBtn from "@/components/core/app/contact-freelancer-btn";

const SingleGig = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const gig = await getSingleGig(id);

  if (!gig) return <></>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header Section */}
      <div className="space-y-4 mb-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {gig.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-sm font-medium animate-fade-in"
            >
              {tag}
            </Badge>
          ))}
        </div>
        <h1 className="text-4xl text-blue-600 font-bold tracking-tight dark:text-gray-50">
          {gig.title}
        </h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-500 dark:text-gray-400">
            Starting From
          </span>
          <EthChip value={gig.minimumPayment.toString()} />
        </div>
      </div>

      {/* Main Content */}
      <Card className="p-6 md:p-8 bg-white dark:bg-gray-800 shadow-lg rounded-xl transition-all duration-200 hover:shadow-xl">
        <div className="prose dark:prose-invert max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {gig.description}
          </ReactMarkdown>
        </div>
      </Card>

      {/* Footer Section */}
      <div className="mt-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <Avatar>
              <AvatarFallback>{gig.owner.slice(0, 2)}</AvatarFallback>
            </Avatar>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Created by
            </p>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
              {`${gig.owner.slice(0, 6)}...${gig.owner.slice(-4)}`}
            </p>
          </div>
        </div>
        <ContactFreelancerBtn id={gig.id} freelancerAddress={gig.owner} />
      </div>
    </div>
  );
};

export default SingleGig;
