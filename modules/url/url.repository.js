import urlModel from "./url.model.js";

export const createUrlRepo = async ({ shortCode, originalUrl, expiresAt }) => {
  await urlModel.create({
    shortCode,
    originalUrl,
    expiresAt,
  });
};
export const findByOriginalUrlRepo = async (originalUrl) => {
  return urlModel.findOne({ originalUrl });
};
export const findByShortCodeRepo = async (shortCode) => {
  return urlModel.findOne({ shortCode });
};
export const shortCodeExistsRepo = async (shortCode) => {
  return urlModel.exists({ shortCode });
};
export const incrementalClickesRepo=async(shortCode)=>{
    return urlModel.updateOne({shortCode},{$inc:{clicks:1}})
}
export const deleteUrlRepo=async(shortCode)=>{
    return urlModel.deleteOne({shortCode});
}
export const getRecentLinksRepo = () => {
  return urlModel.find().sort({ created: 1 }).limit(10).lean();
};
