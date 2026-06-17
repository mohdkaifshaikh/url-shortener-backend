import validator from "validator";
export const validateCreateShortUrl = ({
  originalUrl = "",
  customAlias = "",
}) => {
  console.log(originalUrl);//correct output
  originalUrl = originalUrl.trim();
  customAlias = customAlias.trim();

  if (!originalUrl) {
    throw new Error("Please enter a URL");
  }
  if (originalUrl.length > 2048) {
    throw new Error("URL is too long");
  }

  if (
    !validator.isURL(originalUrl, {
      protocols: ["http", "https"],
      require_protocol: true,
    })
  ) {
    throw new Error("Please enter valid url");
  }
  if (customAlias && !/^[a-zA-Z0-9_-]{3,30}$/.test(customAlias)) {
    throw new Error(
      "Alias can only contain letters, numbers, hyphens and underscores.",
    );
  }
  console.log(originalUrl);//correct output
  return { originalUrl, customAlias };
};
