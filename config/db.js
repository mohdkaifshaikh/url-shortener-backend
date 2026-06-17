import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI;
const connectDB=()=>{
mongoose
  .connect(
    MONGODB_URI,
    {
      dbName: "url-shorterer",
    },
  )
  .then(() => console.log("mongoDB connected..."))
  .catch((err) => console.log(err));

}
export default connectDB;