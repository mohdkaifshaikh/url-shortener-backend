import { getRecentLinksRepo } from "../modules/url/url.repository.js";

const errorHandler = async (err, req, res, next) => {
  const links = await getRecentLinksRepo();

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    recentLinks: links,
    formData: {
      originalUrl: req.body?.originalUrl || "",
    },
  });
};

export default errorHandler;