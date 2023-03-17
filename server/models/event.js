import mongoose from "mongoose";

const { Schema } = mongoose;

const eventSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
    default: () => mongoose.Types.ObjectId(),
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  venue: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Venue",
    required: true,
  },
});

// Index the custom id field so we can use it for querying
eventSchema.index({ id: 1 });

const Event = mongoose.model("Event", eventSchema);

export default Event;
