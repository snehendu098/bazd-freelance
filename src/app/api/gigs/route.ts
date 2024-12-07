// app/api/events/route.ts
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/connect";
import Gig from "@/models/gigs.model";

export async function POST(request: Request) {
  try {
    await dbConnect();

    const { title, description, minimumPayment, tags, owner } =
      await request.json();

    const gig = new Gig({
      title,
      description,
      minimumPayment,
      tags,
      owner,
    });

    const savedGig = await gig.save();

    return Response.json({
      message: "Gig Created Successfully",
      gig: savedGig,
      success: true,
    });
  } catch (error: any) {
    const response = {
      success: false,
      error: error.message,
    };

    return NextResponse.json(response, { status: 400 });
  }
}
