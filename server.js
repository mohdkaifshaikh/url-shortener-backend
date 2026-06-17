import express from "express";
import app from "./app.js";
import connectDB  from "./config/db.js";
import 'dotenv/config'
const port = process.env.PORT || 3002;

connectDB();

app.listen(port, () => {
  console.log(`Server is Listening on port: ${port}`);
});
