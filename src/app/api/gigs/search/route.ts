import Gig from "@/models/gigs.model";
import { PipelineStage } from "mongoose";

// Interface for search options
interface SearchOptions {
  skip?: number;
  limit?: number;
}

// Interface for search results
interface SearchResult {
  _id: string;
  title: string;
  description: string;
  minimumPayment: number;
  tags: string[];
  owner: string;
}

const searchGigs = async (
  searchQuery: string,
  { skip = 0, limit = 10 }: SearchOptions = {}
): Promise<SearchResult[]> => {
  const pipeline: PipelineStage[] = [
    // Match stage for filtering
    {
      $match: {
        $or: [
          {
            title: {
              $regex: searchQuery,
              $options: "i",
            },
          },
          {
            tags: {
              $in: [searchQuery.toLowerCase()],
            },
          },
        ],
      },
    },
    // Add a score field based on match relevance
    {
      $addFields: {
        score: {
          $add: [
            {
              $cond: {
                if: {
                  $regexMatch: {
                    input: "$title",
                    regex: searchQuery,
                    options: "i",
                  },
                },
                then: 2,
                else: 0,
              },
            },
            {
              $cond: {
                if: {
                  $in: [searchQuery.toLowerCase(), "$tags"],
                },
                then: 1,
                else: 0,
              },
            },
          ],
        },
      },
    },
    // Sort by score (descending) and then by _id for consistent pagination
    {
      $sort: {
        score: -1 as const,
        _id: 1 as const,
      },
    },
    // Pagination
    {
      $skip: skip,
    },
    {
      $limit: limit,
    },
    // Project to shape the output and exclude score
    {
      $project: {
        _id: 1,
        title: 1,
        description: 1,
        minimumPayment: 1,
        tags: 1,
        owner: 1,
      },
    },
  ];

  return await Gig.aggregate<SearchResult>(pipeline);
};

export async function POST(req: Request) {
  try {
    const { skip = 0, limit = 10, query } = await req.json();
    const gigs = await searchGigs(query, { skip, limit });

    return Response.json({
      success: true,
      message: "Fetched Successfully",
      gigs,
    });
  } catch (err) {
    console.log("gig search error", err);
    return Response.json(
      { success: false, message: "Gig Search Failed" },
      { status: 400 }
    );
  }
}
