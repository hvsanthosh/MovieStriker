import mongoose from "mongoose";

const playListSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
  },
  movieId: {
    type: String,
    required: true,
  },
});
export default mongoose.model("playList", playListSchema);
