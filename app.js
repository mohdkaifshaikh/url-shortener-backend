import express from "express";
import urlRoutes from "./modules/url/url.routes.js";
import "dotenv/config";
import { fetchHomeData } from "./modules/url/url.service.js";
import errorHandler from'./middlewares/error.middleware.js'
const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  const baseUrl = `http://localhost:${port}`;
  const links = await fetchHomeData();
  const shortUrl = req.query.shortCode
    ? `${baseUrl}/${req.query.shortCode}`
    : null;

  res.json( {
    baseUrl,
    links,
    stats: null,
    shortUrl,
    success: null,
    error: null,
    formData: {},
  });
});

app.use("/", urlRoutes);
app.use(errorHandler)

export default app;
