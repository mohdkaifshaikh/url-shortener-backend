import { nanoid } from "nanoid";
import urlModel from "../models/url.model.js";
import "dotenv/config";

// 1. shortUrl(): This function generate shorturl using orginalurl and nanoid(shortcode).
// 2. Ater generating shorturl, store it in database and also store originalurl
export const shortenUrl = async (req, res) => {
  try {
    const port = process.env.PORT;
    const baseUrl = `http://localhost:${port}`;
    const { originalUrl } = req.body;

    const getRecentLinks = async () => {
      return urlModel.find().sort({ createdAt: -1 }).limit(10).lean();
    };

    const renderPage = async (overrides = {}) => {
      const links = await getRecentLinks();

      return res.render("index", {
        baseUrl,
        links,
        stats: null,
        shortUrl: null,
        success: null,
        error: null,
        formData: {
          originalUrl: originalUrl || "",
        },
        ...overrides,
      });
    };

    if (!originalUrl) {
      return renderPage({
        error: "Please enter a URL.",
      });
    }

    let shortCode;

    do {
      shortCode = nanoid(6);
    } while (await urlModel.findOne({ shortCode }));

    await urlModel.create({
      shortCode,
      originalUrl,
    });

    return res.redirect(`/?shortCode=${shortCode}`);
  } catch (error) {
    console.error("Error creating short URL:", error);

    return res.status(500).render("index", {
      baseUrl: `http://localhost:${process.env.PORT}`,
      links: [],
      stats: null,
      shortUrl: null,
      success: null,
      error: "Something went wrong. Please try again.",
      formData: {
        originalUrl: req.body.originalUrl || "",
      },
    });
  }
};

// 1. redirectUrl(): it is use to redirect user on originalurl when they request using shorturl
export const redirectUrl = async (req, res) => {
  try {
    const link = await urlModel.findOneAndUpdate(
      { shortCode: req.params.code },
      { $inc: { clicks: 1 } },
      { returnDocument: "after" }
    );
    if (!link) return res.status(404).send("Link not found");
    res.redirect(link.originalUrl);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};
// 1. deleteUrl(): it is used to delete record from database
export const deleteUrl = async (req, res) => {
  try {
    await urlModel.deleteOne({ shortCode: req.params.code });
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};
