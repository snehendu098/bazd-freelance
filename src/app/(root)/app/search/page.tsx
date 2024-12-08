import SearchResults from "@/components/core/app/screen/search-results";
import React, { Suspense } from "react";

export const dynamic = "force-dynamic";

const Page = () => {
  return (
    <Suspense>
      <SearchResults />
    </Suspense>
  );
};

export default Page;
