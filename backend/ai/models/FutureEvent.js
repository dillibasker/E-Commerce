import mongoose from "mongoose";

const futureEventSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  eventName: String,
  probability: Number,
  expectedMonth: String,
  status: {
    type: String,
    enum: ["active", "ignored", "locked"],
    default: "active"
  }
}, { timestamps: true });

export default mongoose.model("FutureEvent", futureEventSchema);