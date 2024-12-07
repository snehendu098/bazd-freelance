import Gig from "@/models/gigs.model";
import { dbConnect } from "./connect";

export async function getGigs() {
  await dbConnect();
  const gigs = await Gig.find({}).sort({ createdAt: -1 });
  return gigs;
}

export async function getSingleGig(id: string) {
  await dbConnect();
  const event = await Gig.findById(id);
  return event;
}
