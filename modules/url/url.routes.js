import express from 'express';
import { deleteUrl, getUrlInfoForAPI, redirectUrl, shortenUrl, shortenUrlForAPI } from "./url.controller.js";
import { validateShortUrl } from '../../middlewares/validate.middleware.js';

const router=express.Router();
// only used to test APIs
router.post("/api/url/shorten",validateShortUrl,shortenUrlForAPI);
router.get("/api/url/:code",getUrlInfoForAPI);

// for redirect t original url
router.post("/shorten",validateShortUrl,shortenUrl);
router.get("/:code",redirectUrl);
router.delete("/delete/:code",deleteUrl);
export default router;