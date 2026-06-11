import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import {
  shortenUrl,
  deleteUrl,
  redirectUrl,
} from "./controllers/url.controller.js";
import Url from "./models/url.model.js";
import urlModel from "./models/url.model.js";

const app = express();
const port = process.env.PORT;
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://Mohammadkaifshaikh:GHtc5665@cluster0.hbhi6.mongodb.net/",
    {
      dbName: "url-shorterer",
    },
  )
  .then(() => console.log("mongoDB connected..."))
  .catch((err) => console.log(err));

app.get("/", async (req, res) => {
  const baseUrl=`http://localhost:${process.env.PORT}`;
  const links = await urlModel
    .find()
    .sort({ createdAt: -1 })
    .limit(10)
    .lean();

      const shortUrl = req.query.shortCode
    ? `${baseUrl}/${req.query.shortCode}`
    : null;

  res.render("index", {
    baseUrl,
    links,
    stats: null,
    shortUrl,
    success: null,
    error: null,
    formData: {},
  });
});
app.post("/shorten", shortenUrl);
app.delete("/delete/:code", deleteUrl); // called by the delete button in UI
app.get("/:code", redirectUrl); // redirects short link to original

app.listen(port, () => {
  console.log(`Server is Listening on port: ${port}`);
});
