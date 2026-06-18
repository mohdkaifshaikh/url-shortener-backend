import { nanoid } from "nanoid";
import {
  createUrlRepo,
  deleteUrlRepo,
  findByOriginalUrlRepo,
  findByShortCodeRepo,
  getRecentLinksRepo,
  incrementalClickesRepo,
  shortCodeExistsRepo,
} from "./url.repository.js";
import { validateCreateShortUrl } from "./url.validator.js";
import { safeURL } from "../../utils/safeURL.js";
export const createShortUrlService = async ({ data }) => {
  const { originalUrl, customAlias } = validateCreateShortUrl(data);
  const urlHostname = safeURL(originalUrl)
    .hostname.toLowerCase()
    .replace(/^www\./, "")
    .split(":")[0];
  const blockedHosts = ["localhost", "127.0.0.1"];
  if (blockedHosts.includes(urlHostname)) {
    throw new Error("Please enter valid url hostname");
  }
  const existingUrl = await findByOriginalUrlRepo(originalUrl);
  if (
    existingUrl &&
    (!existingUrl.expiresAt || existingUrl.expiresAt > new Date())
  ) {
    return {
      existing: true,
      shortCode: existingUrl.shortCode,
    };
  }
  let shortCode;
  if (customAlias) {
    const customAliasExists = await shortCodeExistsRepo(customAlias);
    if (customAliasExists) {
      throw new Error("Alias already exist");
    }
    shortCode = customAlias;
  } else {
    do {
      shortCode = nanoid(6);
    } while (await shortCodeExistsRepo(shortCode));
  }
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  await createUrlRepo({
    shortCode,
    originalUrl,
    expiresAt,
  });
  return {
    existing: false,
    shortCode,
  };
};

export const getOriginalUrlService = async (shortCode) => {
  const link = await findByShortCodeRepo(shortCode);
  if (!link) {
    throw new Error("Link not found");
  }
  if (link.expiresAt && link.expiresAt < new Date()) {
    throw new Error("Link expired");
  }
  await incrementalClickesRepo(shortCode);
  return link.originalUrl;
};

export const deleteShortUrlService = async (shortCode) => {
  const deleted = await deleteUrlRepo(shortCode);
  if (!deleted) {
    throw new Error("Link not found");
  }
};

export const fetchHomeData = async () => {
  const links = await getRecentLinksRepo();
  return links;
};
