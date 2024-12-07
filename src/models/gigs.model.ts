import { IGig } from "@/types/gig";
import mongoose, { Document, Model } from "mongoose";

export interface IGigDocument extends IGig, Document {}
const gigSchema = new mongoose.Schema<IGigDocument>(
  {
    title: {
      type: String,
      required: [true, "Please provide a gig title"],
      trim: true,
      maxLength: [100, "Title cannot be more than 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Please provide a gig description"],
      trim: true,
    },
    minimumPayment: {
      type: Number,
      required: [true, "Please provide a minimum payment"],
      min: [0, "Minimum payment cannot be negative"],
    },
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],
    owner: {
      type: String,
      required: [true, "Please provide a owner"],
    },
  },
  { timestamps: true }
);

const Gig: Model<IGigDocument> =
  mongoose.models.Gig || mongoose.model<IGigDocument>("Gig", gigSchema);
export default Gig;
