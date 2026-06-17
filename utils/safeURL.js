export const safeURL = (url) => {
  try {
    return new URL(url);
  } catch {
    throw new Error("Invalid URL format");
  }
};