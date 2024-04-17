import mongoose from "mongoose";
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  title: { type: String },
  platform: [],
  reviews: [],
});
export const Game = mongoose.model("Game", gameSchema);

const authoreSchema = new Schema({
  name: { type: String },
  verified: { type: Boolean },
  reviews: [],
});
export const Author = mongoose.model("Author", authoreSchema);

const reviewSchema = new Schema({
  //   _id: mongoose.Schema.Types.ObjectId,
  rating: { type: Number },
  content: { type: String },
  gameId: { type: mongoose.ObjectId, ref: "Game" },
  authorId: { type: mongoose.ObjectId, ref: "Author" },
});
export const Review = mongoose.model("Review", reviewSchema);
