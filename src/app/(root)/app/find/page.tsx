import SearchBar from "@/components/core/app/search-bar";
import React from "react";
import { getGigs } from "@/lib/db-function";
import JobCard from "@/components/core/app/job-card";

export const dynamic = "force-dynamic";

const FindPage = async () => {
  const gigs = await getGigs();
  return (
    <>
      <section className="text-center">
        <div className="container mx-auto px-4">
          <h2 className="mb-6 text-4xl font-bold md:text-6xl bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
            Discover <span>BAZD</span> Talents
            <br />
            On Chain
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-lg text-gray-600 dark:text-zinc-300">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
            ducimus, debitis magnam modi accusantium aliquid quia. Nam sint
            culpa a doloremque
          </p>

          {/* Search Bar */}
          <SearchBar />
        </div>
      </section>
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Event Items */}
            {JSON.parse(JSON.stringify(gigs)).map((gig: any, index: number) => (
              <JobCard item={gig} key={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FindPage;
