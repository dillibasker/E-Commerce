import mongoose from "mongoose";

const futureCartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "FutureEvent" },
  products: [],
  totalEstimatedPrice: Number,
  explanationFromFutureSelf: String
}, { timestamps: true });

export default mongoose.model("FutureCart", futureCartSchema);