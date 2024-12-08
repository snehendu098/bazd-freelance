// app/api/events/route.ts
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/connect";
import { ChatRoom } from "@/models/chatroom.model";

export async function POST(request: Request) {
  try {
    await dbConnect();

    const { id, message } = await request.json();

    const foundRoom = await ChatRoom.findById(id);

    if (!foundRoom)
      return Response.json(
        {
          success: false,
          message: "No chat found",
        },
        { status: 400 }
      );

    if (!message) {
      return Response.json({
        success: true,
        messages: foundRoom.messages,
      });
    }

    foundRoom.messages.push(message);
    const updatedRoom = await foundRoom.save();

    return Response.json({
      success: true,
      messages: updatedRoom.messages,
    });
  } catch (error: any) {
    console.log(error);
    const response = {
      success: false,
      error: error.message,
    };

    return NextResponse.json(response, { status: 400 });
  }
}
