import { dbConnect } from "@/lib/connect";
import { ChatRoom } from "@/models/chatroom.model";

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { address } = await request.json();

    const foundRooms = await ChatRoom.aggregate([
      {
        $match: {
          $or: [{ clientAddress: address }, { freelancerAddress: address }],
        },
      },
    ]);

    return Response.json({
      success: true,
      rooms: foundRooms,
    });
  } catch (error: any) {
    console.log(error);
    const response = {
      success: false,
      error: error.message,
    };

    return Response.json(response, { status: 400 });
  }
}
