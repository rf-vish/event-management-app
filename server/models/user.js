import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
    default: () => mongoose.Types.ObjectId(),
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// Index the custom id field so we can use it for querying
userSchema.index({ id: 1 });

const User = mongoose.model("User", userSchema);

export default User;
