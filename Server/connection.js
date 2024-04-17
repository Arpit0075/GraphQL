import mongoose from "mongoose";

export const connect = async () => {
  try {
    let localUrl = "mongodb://localhost:27017/graphQl";
    mongoose.set("strictQuery", false);
    mongoose.connect(localUrl);
  } catch (err) {
    console.log(err);
    process.exit();
  }
};
