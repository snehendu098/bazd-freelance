import mongoose, { Schema, Document } from "mongoose";

// Interface for a single message
interface IMessage {
  sender: string;
  content: string;
  type: number;
}

// Interface for the Chat document
interface IChat extends Document {
  clientAddress: string;
  freelancerAddress: string;
  messages: IMessage[];
  createdAt: Date;
  updatedAt: Date;
}

// Schema for individual messages
const MessageSchema = new Schema({
  sender: {
    type: String,
    required: [true, "Sender address is required"],
    trim: true,
  },
  content: {
    type: String,
    required: [true, "Message content is required"],
    trim: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// Main Chat Schema
const ChatSchema = new Schema(
  {
    clientAddress: {
      type: String,
      required: [true, "Client address is required"],
      trim: true,
    },
    freelancerAddress: {
      type: String,
      required: [true, "Freelancer address is required"],
      trim: true,
    },
    messages: [MessageSchema],
  },
  {
    timestamps: true,
  }
);

const ChatRoom =
  mongoose.models.ChatRoom || mongoose.model<IChat>("ChatRoom", ChatSchema);

export { ChatRoom, type IChat, type IMessage };
