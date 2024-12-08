import { dbConnect } from "@/lib/connect";
import { ChatRoom } from "@/models/chatroom.model";

export async function POST(request: Request) {
  try {
    await dbConnect();

    const { clientAddress, freelancerAddress } = await request.json();

    const foundRoom = await ChatRoom.findOne({
      clientAddress,
      freelancerAddress,
    });

    if (foundRoom)
      return Response.json({
        room: foundRoom,
        success: true,
        chatRoomId: foundRoom._id.toString(),
      });

    const room = new ChatRoom({
      clientAddress: clientAddress,
      freelancerAddress: freelancerAddress,
      messages: [],
    });

    const savedRoom = await room.save();

    return Response.json({
      room: savedRoom,
      success: true,
      chatRoomId: room._id.toString(),
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
