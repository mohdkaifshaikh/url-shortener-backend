import { nanoid } from "nanoid";
import urlModel from "./url.model.js";
import validator from "validator";
import "dotenv/config";
import { createShortUrlService, deleteShortUrlService, getOriginalUrlService } from "./url.service.js";
import asyncHandler from "../../middlewares/asyncHandler.js";

// 1. shortUrl(): This function generate shorturl using orginalurl and nanoid(shortcode).
// 2. Ater generating shorturl, store it in database and also store originalurl
export const shortenUrl = asyncHandler(async (req, res) => {
  const result = await createShortUrlService({data:req.body});
    return res.status(201).json({
    message: "Short URL created successfully",
    shortCode: result.shortCode,
    shortUrl: `http://localhost:${process.env.PORT}/${result.shortCode}`,
  });
});
export const shortenUrlForAPI = asyncHandler(async (req, res) => {
  const result = await createShortUrlService({data:req.body});
    return res.status(201).json({
    message: "Short URL created successfully",
    shortCode: result.shortCode,
    shortUrl: `http://localhost:${process.env.PORT}/api/url/${result.shortCode}`,
  });
});

// 1. redirectUrl(): it is use to redirect user on originalurl when they request using shorturl
export const redirectUrl = asyncHandler(async (req, res) => {
  const originalUrl = await getOriginalUrlService(req.params.code);
  return res.redirect(originalUrl);
});
export const getUrlInfoForAPI = asyncHandler(async (req, res) => {
  const originalUrl = await getOriginalUrlService(req.params.code);
  return res.json({
    shortCode: req.params.code,
    originalUrl,
  });
});
// 1. deleteUrl(): it is used to delete record from database
export const deleteUrl = asyncHandler(async (req, res) => {
  await deleteShortUrlService(req.params.code);
  res.status(200).json({
    message:"URL deleted successfully"
  })
});
