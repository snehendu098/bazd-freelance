import SearchResults from "@/components/core/app/screen/search-results";
import React, { Suspense } from "react";

const Page = () => {
  return (
    <Suspense>
      <SearchResults />
    </Suspense>
  );
};

export default Page;
