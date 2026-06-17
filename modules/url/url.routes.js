import express from 'express';
import { deleteUrl, getUrlInfoForAPI, redirectUrl, shortenUrl, shortenUrlForAPI } from "./url.controller.js";
import { validateShortUrl } from '../../middlewares/validate.middleware.js';

const router=express.Router();
router.post("/shorten",validateShortUrl,shortenUrl);
router.post("/api/url/shorten",validateShortUrl,shortenUrlForAPI);
router.get("/:code",redirectUrl);
router.get("/api/url/:code",getUrlInfoForAPI);
router.delete("/delete/:code",deleteUrl);
export default router;